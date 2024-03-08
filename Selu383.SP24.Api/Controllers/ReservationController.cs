using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Selu383.SP24.Api.Data;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.HotelReservations;
using Selu383.SP24.Api.Features.HotelRoom;

namespace Selu383.SP24.Api.Controllers;

[Route("api/reservation")]
[ApiController]
public class ReservationController : ControllerBase
{
    private readonly DataContext _context;
    private readonly UserManager<User> _userManager;
    private readonly ILogger<ServiceRequestController> _logger;
    private readonly IMapper _autoMapper;

    public ReservationController(DataContext dataContext, UserManager<User> userManager, ILogger<ServiceRequestController> logger, IMapper mapper)
    {
        this._context = dataContext;
        _userManager = userManager;
        _logger = logger;
        _autoMapper = mapper;
    }

    [HttpGet("GetAllReservations")]
    public async Task<ActionResult<Reservation>> GetAllReservations()
    {
        var reservations = await _context.Reservations
            .Include(r => r.Hotel)
            .Include(r => r.Room)
            .ThenInclude(ro => ro.Package)
            .Include(r => r.Status)
            .Include(r => r.Guest).ToListAsync();

        return Ok(reservations);
    }

    [HttpGet("GetReservationByAny")]
    public async Task<ActionResult<IEnumerable<Room>>> GetRooms(
      [FromQuery] int? hotelId,
      [FromQuery] int? roomId,
      [FromQuery] int? roomNumber,
      [FromQuery] string? reservationStatus,
      [FromQuery] DateTime? reservationDate)
    {
        IQueryable<Reservation> query = _context.Reservations
            .Include(r => r.Hotel)
            .Include(r => r.Room)
            .ThenInclude(r => r.Package)            
            .Include(r => r.Room)
            .ThenInclude(r => r.RoomStatus)
            .Include(r => r.Guest)
            .Include(r => r.Status);

        if (hotelId.HasValue)
        {
            query = query.Where(r => r.HotelId == hotelId);
        }

        if (roomId.HasValue)
        {
            query = query.Where(r => r.RoomId == roomId);
        }

        if (roomNumber.HasValue)
        {
            query = query.Where(r => r.Room.RoomNumber == roomNumber);
        }

        if (reservationStatus != null)
        {
            query = query.Where(r => r.Status.Status == reservationStatus);
        }

        var rooms = await query.ToListAsync();
        return Ok(rooms);
    }

    [HttpPost("CreateReservation")]
    public async Task<ActionResult<ReservationDTO>> CreateReservation(int roomId, DateTime reservationDate)
    {
        var user = await _userManager.GetUserAsync(User);
        var statusId = await _context.UniversalStatuses.Where(us => us.Status == "Started").Select(us => us.Id).FirstOrDefaultAsync();
        var hotelId = await _context.Rooms.Where(r => r.Id == roomId).Select(r => r.HotelId).FirstOrDefaultAsync();
        var reservation = new Reservation
        {
            HotelId = hotelId,
            RoomId = roomId,
            GuestId = user.Id,
            StatusId = statusId,
            CreatedAt = DateTime.UtcNow,
            ReservationDate = reservationDate
        };

        //TODO: Make Room Status "Reserved" when creating a reservation

        _context.Reservations.Add(reservation);
        _context.SaveChanges();

        var reservationDTO = _autoMapper.Map<ReservationDTO>(reservation);

        return Ok(reservationDTO);
    }

}