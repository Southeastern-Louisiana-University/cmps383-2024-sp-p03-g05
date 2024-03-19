using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Data;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.HotelReservations;
using Selu383.SP24.Api.Features.HotelRoom;

namespace Selu383.SP24.Api.Services.ServiceClasses;

public class ReservationService : IReservationService
{
    private readonly DataContext _context;
    private readonly UserManager<User> _userManager;
    private readonly IMapper _autoMapper;
    private readonly IHttpContextAccessor _httpContextAccessor;


    public ReservationService( DataContext context, UserManager<User> userManager, IMapper mapper, IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _userManager = userManager;
        _autoMapper = mapper;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<IEnumerable<ReservationDTO>> GetAllReservationsAsync()
    {
        var reservationsDto = await _context.Reservations
          .Include(r => r.Hotel)
          .Include(r => r.Room)
          .ThenInclude(ro => ro.Package)
          .Include(r => r.Status)
          .Include(r => r.Guest)
          .Select(r => new ReservationDTO
          {
              Id = r.Id,
              Hotel = r.Hotel.Name, // Assuming Hotel has a Name property
              RoomNumber = r.Room.RoomNumber, // Assuming Room has a Number property
              GuestId = r.Guest.Id,
              Status = r.Status.Status, // Assuming Status has a Name property
              CreatedAt = r.CreatedAt,
              ReservationStartDate = r.ReservationStartDate,
              ReservationEndDate = r.ReservationEndDate
          })
          .ToListAsync();

        return reservationsDto;
    }

    public async Task<IEnumerable<ReservationDTO>> GetReservationsBetweenDatesAsync(DateTime startDate, DateTime endDate)
    {
        // Ensure the date range is valid
        if (startDate > endDate)
        {
        }

        // Query and project the reservations that are within the specified date range
        var reservationsDto = await _context.Reservations
            .Where(r => r.ReservationStartDate >= startDate && r.ReservationEndDate <= endDate)
            .Include(r => r.Hotel)
            .Include(r => r.Room)
            .ThenInclude(ro => ro.Package)
            .Include(r => r.Status)
            .Include(r => r.Guest)
            .Select(r => new ReservationDTO
            {
                Id = r.Id,
                Hotel = r.Hotel.Name, // Assuming Hotel has a Name property
                RoomNumber = r.Room.RoomNumber, // Assuming Room has a Number property
                GuestId = r.Guest.Id,
                Status = r.Status.Status, // Assuming Status has a Name property
                CreatedAt = r.CreatedAt,
                ReservationStartDate = r.ReservationStartDate,
                ReservationEndDate = r.ReservationEndDate
            })
            .ToListAsync();

        return reservationsDto;
    }

    public async Task<IEnumerable<ReservationDTO>> GetReservationsByAnyAsync(int? hotelId, int? roomId, int? roomNumber, string? reservationStatus, DateTime? reservationDate)
    {
        var query =  _context.Reservations
            .Include(reservation => reservation.Room)
                .ThenInclude(room => room.Hotel)
            .Include(reservation => reservation.Room)
                .ThenInclude(room => room.Package)
            .Include(reservation => reservation.Room)
                .ThenInclude(room => room.RoomStatus)
            .Include(reservation => reservation.Status)
            .AsQueryable();

        if (hotelId.HasValue)
        {
            query = query.Where(reservation => reservation.Room.HotelId == hotelId);
        }

        if (roomId.HasValue)
        {
            query = query.Where(reservation => reservation.RoomId == roomId);
        }

        if (roomNumber.HasValue)
        {
            query = query.Where(reservation => reservation.Room.RoomNumber == roomNumber);
        }

        if (!string.IsNullOrEmpty(reservationStatus))
        {
            query = query.Where(reservation => reservation.Status.Status == reservationStatus);
        }

        if (reservationDate.HasValue)
        {
            query = query.Where(reservation => reservation.ReservationStartDate <= reservationDate.Value && reservation.ReservationEndDate >= reservationDate.Value);
        }

        // Assuming you have a method to map from Reservation entities to ReservationDTO
        var reservations = _autoMapper.Map<List<ReservationDTO>>(query);


        return reservations;
    }



    public async Task<ReservationDTO> CreateReservationAsync(int roomId, DateTime reservationStartDate, DateTime reservationEndDate)
    {
        var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);

        var statusId = await _context.UniversalStatuses.Where(us => us.Status == "Started").Select(us => us.Id).FirstOrDefaultAsync();
        var hotelId = await _context.Rooms.Where(r => r.Id == roomId).Select(r => r.HotelId).FirstOrDefaultAsync();

        var reservation = new Reservation
        {
            HotelId = hotelId,
            RoomId = roomId,
            GuestId = user.Id, 
            StatusId = statusId,
            CreatedAt = DateTime.UtcNow,
            ReservationStartDate = reservationStartDate,
            ReservationEndDate = reservationEndDate
        };

        //TODO: Handle updating the room status to "Reserved" here, if not already being handled elsewhere.

        _context.Reservations.Add(reservation);
        await _context.SaveChangesAsync(); // Use async version

        var reservationDTO = _autoMapper.Map<ReservationDTO>(reservation);

        return reservationDTO;
    }

}

