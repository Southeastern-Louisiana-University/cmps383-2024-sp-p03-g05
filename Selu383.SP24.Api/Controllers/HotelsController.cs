using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Data;
using Selu383.SP24.Api.Extensions;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.Hotels;
using Selu383.SP24.Api.Services;

namespace Selu383.SP24.Api.Controllers;

[Route("api/hotels")]
[ApiController]
public class HotelsController : ControllerBase
{
    private readonly DataContext _context;
    private readonly UserManager<User> _userManager;
    private readonly ILogger<ServiceRequestController> _logger;
    private readonly IMapper _autoMapper;
    private readonly IHotelService _hotelService;

    public HotelsController(
        DataContext dataContext,
        UserManager<User> userManager,
        ILogger<ServiceRequestController> logger,
        IMapper mapper,
        IHotelService hotelService
    )
    {
        this._context = dataContext;
        _userManager = userManager;
        _logger = logger;
        _autoMapper = mapper;
        _hotelService = hotelService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<HotelDto>>> GetAllHotels()
    {
        var result = await _hotelService.GetAllHotels();

        return Ok(result);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<HotelDto>> GetHotelById(int id)
    {
        var result = await _hotelService.GetHotelById(id);

        return Ok(result);
    }

    [HttpPost]
    [Authorize(Roles = RoleNames.Admin)]
    public async Task<ActionResult<HotelDto>> CreateHotel(HotelDto dto)
    {
        var result = await _hotelService.CreateHotel(dto);

        return CreatedAtAction(nameof(GetHotelById), new { id = dto.Id }, dto);
    }

    [HttpPut]
    [Route("{id}")]
    [Authorize]
    public async Task<ActionResult<HotelDto>> UpdateHotel(int id, HotelDto dto)
    {
        var result = await _hotelService.UpdateHotel(id, dto);

        if (!User.IsInRole(RoleNames.Admin) && User.GetCurrentUserId() != result.ManagerId)
        {
            return Forbid();
        }

        return Ok(result);
    }

    [HttpDelete]
    [Route("{id}")]
    [Authorize]
    public async Task<ActionResult> DeleteHotel(int id)
    {
        var result = await _hotelService.DeleteHotel(id);

        return Ok(result);
    }

    [HttpGet("SearchForHotel")]
    public IActionResult Search(string searchTerm)
    {
        if (string.IsNullOrWhiteSpace(searchTerm))
        {
            return BadRequest("Search term cannot be empty.");
        }

        var result = _context
            .Hotels.Where(h =>
                EF.Functions.Like(h.Name, $"%{searchTerm}%")
                || EF.Functions.Like(h.Address, $"%{searchTerm}%")
            )
            .ToList();

        return Ok(result);
    }
}
