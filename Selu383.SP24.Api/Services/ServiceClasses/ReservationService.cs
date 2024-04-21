using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Data;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.HotelReservations;
using Selu383.SP24.Api.Features.HotelRoom;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Selu383.SP24.Api.Services.ServiceClasses;

public class ReservationService : IReservationService
{
    private readonly DataContext _context;
    private readonly UserManager<User> _userManager;
    private readonly IMapper _autoMapper;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public ReservationService(
        DataContext context,
        UserManager<User> userManager,
        IMapper mapper,
        IHttpContextAccessor httpContextAccessor
    )
    {
        _context = context;
        _userManager = userManager;
        _autoMapper = mapper;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<IEnumerable<ReservationDTO>> GetAllReservationsAsync()
    {
        var reservationsDto = await _context
            .Reservations.Include(r => r.Hotel)
            .Include(r => r.Room)
            .ThenInclude(ro => ro.Package)
            .Include(r => r.Status)
            .Include(r => r.Guest)
            .OrderByDescending(r => r.ReservationStartDate)
            .Select(r => new ReservationDTO
            {
                Id = r.Id,
                Hotel = r.Hotel.Name,
                HotelAddress = r.Hotel.Address,
                RoomNumber = r.Room.RoomNumber,
                GuestId = r.Guest.Id,
                Status = r.Status.Status,
                PhoneNumber = r.Hotel.PhoneNumber,
                CreatedAt = r.CreatedAt,
                ReservationStartDate = r.ReservationStartDate,
                ReservationEndDate = r.ReservationEndDate
            })
            .ToListAsync();

        return reservationsDto;
    }

    public async Task<IEnumerable<ReservationDTO>> GetReservationsBetweenDatesAsync(
        DateTime startDate,
        DateTime endDate
    )
    {
        if (startDate > endDate)
        {
            //return an empty list
            return new List<ReservationDTO>();
        }

        var reservationsDto = await _context
            .Reservations.Where(r =>
                r.ReservationStartDate >= startDate && r.ReservationEndDate <= endDate
            )
            .Include(r => r.Hotel)
            .Include(r => r.Room)
            .ThenInclude(ro => ro.Package)
            .Include(r => r.Status)
            .Include(r => r.Guest)
            .OrderByDescending(r => r.ReservationStartDate)
            .Select(r => new ReservationDTO
            {
                Id = r.Id,
                Hotel = r.Hotel.Name,
                HotelAddress = r.Hotel.Address,
                RoomNumber = r.Room.RoomNumber,
                GuestId = r.Guest.Id,
                Status = r.Status.Status,
                PhoneNumber = r.Hotel.PhoneNumber,
                CreatedAt = r.CreatedAt,
                ReservationStartDate = r.ReservationStartDate,
                ReservationEndDate = r.ReservationEndDate
            })
            .ToListAsync();

        return reservationsDto;
    }

    public async Task<IEnumerable<ReservationDTO>> GetReservationsByAnyAsync(
        int? id,
        int? hotelId,
        int? roomId,
        int? roomNumber,
        string? reservationStatus,
        DateTime? reservationDate
    )
    {
        var query = _context
            .Reservations.Include(reservation => reservation.Room)
            .ThenInclude(room => room.Hotel)
            .Include(reservation => reservation.Room)
            .ThenInclude(room => room.Package)
            .Include(reservation => reservation.Room)
            .ThenInclude(room => room.RoomStatus)
            .Include(reservation => reservation.Status)
            .AsQueryable();

        if (id.HasValue)
        {
            query = query.Where(reservation => reservation.Id == id);
        }
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
            query = query.Where(reservation =>
                reservation.ReservationStartDate <= reservationDate.Value
                && reservation.ReservationEndDate >= reservationDate.Value
            );
        }

        var reservations = _autoMapper.Map<List<ReservationDTO>>(query);

        return reservations;
    }

    public async Task<ReservationDTO> CreateReservationAsync(
        int hotelId,
        int packageId,
        DateTime reservationStartDate,
        DateTime reservationEndDate
    )
    {
        try
        {
            var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);
            if (user == null)
            {
                throw new UnauthorizedAccessException("User is not logged in.");
            }

            var status = await _context
                .UniversalStatuses.Where(us => us.Status == "Started")
                .FirstOrDefaultAsync();

            // Find the next available room
            var roomToReserve = await _context
                .Rooms.Where(r => r.HotelId == hotelId && r.PackageId == packageId)
                .Where(r =>
                    !_context.Reservations.Any(res =>
                        res.RoomId == r.Id
                        && res.ReservationEndDate > reservationStartDate
                        && res.ReservationStartDate < reservationEndDate
                    )
                )
                .FirstOrDefaultAsync();

            if (roomToReserve == null)
            {
                throw new ApplicationException("No available rooms for the selected dates.");
            }

            var hotel = await _context.Hotels.Where(h => h.Id == hotelId).FirstOrDefaultAsync();

            var reservation = new Reservation
            {
                HotelId = hotelId,
                RoomId = roomToReserve.Id,
                GuestId = user.Id,
                StatusId = status.Id,
                CreatedAt = DateTime.UtcNow,
                ReservationStartDate = reservationStartDate,
                ReservationEndDate = reservationEndDate
            };
            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();

            var reservationDTO = new ReservationDTO
            {
                Id = reservation.Id,
                Hotel = hotel.Name,
                HotelAddress = hotel.Address,
                RoomNumber = roomToReserve.RoomNumber,
                GuestId = user.Id,
                Status = status.Status,
                PhoneNumber = hotel.PhoneNumber,
                CreatedAt = DateTime.UtcNow,
                ReservationStartDate = reservationStartDate,
                ReservationEndDate = reservationEndDate,
            };

            return reservationDTO;
        }
        catch (UnauthorizedAccessException)
        {
            throw;
        }
        catch (Exception ex)
        {
            throw new ApplicationException("An error occurred while creating the reservation.", ex);
        }
    }

    public async Task<List<ReservationDTO>> SeeMyReservation()
    {
        var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);
        if (user == null)
        {
            throw new UnauthorizedAccessException("User not found.");
        }

        var reservations = await _context
            .Reservations.Where(r => r.GuestId == user.Id)
            .Where(r => r.ReservationStartDate >= DateTime.Now)
            .Include(r => r.Room)
            .ThenInclude(room => room.Hotel)
            .Include(r => r.Status)
            .OrderByDescending(r => r.ReservationStartDate)
            .ToListAsync();

        var reservationDTOs = reservations
            .Select(r => new ReservationDTO
            {
                Id = r.Id,
                Hotel = r.Room.Hotel.Name,
                HotelAddress = r.Room.Hotel.Address,
                RoomNumber = r.Room.RoomNumber,
                GuestId = r.GuestId,
                Status = r.Status.Status,
                CreatedAt = r.CreatedAt,
                PhoneNumber = r.Hotel.PhoneNumber,
                ReservationStartDate = r.ReservationStartDate,
                ReservationEndDate = r.ReservationEndDate,
            })
            .ToList();

        return reservationDTOs;
    }

    public async Task<List<ReservationDTO>> SeeMyOldReservation()
    {
        var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);
        if (user == null)
        {
            throw new UnauthorizedAccessException("User not found.");
        }

        var reservations = await _context
            .Reservations.Where(r => r.GuestId == user.Id)
            .Where(r => r.ReservationStartDate < DateTime.Now)
            .Include(r => r.Room)
            .ThenInclude(room => room.Hotel)
            .Include(r => r.Status)
            .OrderByDescending(r => r.ReservationStartDate)
            .ToListAsync();

        var reservationDTOs = reservations
            .Select(r => new ReservationDTO
            {
                Id = r.Id,
                Hotel = r.Room.Hotel.Name,
                HotelAddress = r.Room.Hotel.Address,
                RoomNumber = r.Room.RoomNumber,
                GuestId = r.GuestId,
                Status = r.Status.Status,
                CreatedAt = r.CreatedAt,
                PhoneNumber = r.Hotel.PhoneNumber,
                ReservationStartDate = r.ReservationStartDate,
                ReservationEndDate = r.ReservationEndDate,
            })
            .ToList();

        return reservationDTOs;
    }
}
