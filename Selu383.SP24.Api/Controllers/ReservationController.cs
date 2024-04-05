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
    public async Task<ActionResult<ReservationDTO>> CreateReservation(int hotelId, int packageId, DateTime reservationStartDate, DateTime reservationEndDate)
    {
        try
        {
            var result = await _reservationService.CreateReservationAsync(hotelId, packageId, reservationStartDate, reservationEndDate);
            return Ok(result);
        }
        catch (UnauthorizedAccessException ex)
        {
            // Log the exception message if necessary
            return Unauthorized(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            // Handle other exceptions, possibly returning a generic error response
            // Log the exception and return a suitable error message
            return StatusCode(500, new { message = "An error occurred while processing your request." });
        }
    }

    [HttpGet("GetMyReservations")]
    public async Task<ActionResult<List<ReservationDTO>>> GetMyReservations()
    {
        var result = await _reservationService.SeeMyReservation();

        return Ok(result);
    }
}