using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Selu383.SP24.Api.Data;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.HotelReservations;
using Selu383.SP24.Api.Features.HotelRoom;
using Selu383.SP24.Api.Services;

namespace Selu383.SP24.Api.Controllers;

[Route("api/reservation")]
[ApiController]
public class ReservationController : ControllerBase
{
    private readonly DataContext _context;
    private readonly UserManager<User> _userManager;
    private readonly ILogger<ServiceRequestController> _logger;
    private readonly IMapper _autoMapper;
    private readonly IReservationService _reservationService;

    public ReservationController(IReservationService reservationService, DataContext dataContext, UserManager<User> userManager, ILogger<ServiceRequestController> logger, IMapper mapper)
    {
        _context = dataContext;
        _userManager = userManager;
        _logger = logger;
        _autoMapper = mapper;
        _reservationService = reservationService;
    }

    [HttpGet("GetAllReservations")]
    public async Task<ActionResult<IEnumerable<ReservationDTO>>> GetAllReservations()
    {
        var result = await _reservationService.GetAllReservationsAsync();

        return Ok(result);
    }

    [HttpGet("GetReservationsBetweenDates")]
    public async Task<ActionResult<IEnumerable<ReservationDTO>>> GetReservationsBetweenDates(DateTime startDate, DateTime endDate)
    {
        var result = await _reservationService.GetReservationsBetweenDatesAsync(startDate, endDate);
        
        return Ok(result);
    }


    [HttpGet("GetReservationByAny")]
    public async Task<ActionResult<IEnumerable<Room>>> GetRooms(
      [FromQuery] int? hotelId,
      [FromQuery] int? roomId,
      [FromQuery] int? roomNumber,
      [FromQuery] string? reservationStatus,
      [FromQuery] DateTime? reservationDate)
    {
        var result = await _reservationService.GetReservationsByAnyAsync(hotelId, roomId, roomNumber, reservationStatus, reservationDate);

        return Ok(result);
    }

    [HttpPost("CreateReservation")]
    public async Task<ActionResult<ReservationDTO>> CreateReservation(int roomId, DateTime reservationStartDate, DateTime reservationEndDate)
    {

        var result = await _reservationService.CreateReservationAsync(roomId, reservationStartDate, reservationEndDate);

        return Ok(result);
    }
}