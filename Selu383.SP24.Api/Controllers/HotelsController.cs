using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Data;
using Selu383.SP24.Api.Extensions;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.Hotels;

namespace Selu383.SP24.Api.Controllers;

[Route("api/hotels")]
[ApiController]
public class HotelsController : ControllerBase
{
    private readonly DataContext _context;
    private readonly UserManager<User> _userManager;
    private readonly ILogger<ServiceRequestController> _logger;
    private readonly IMapper _autoMapper;

    public HotelsController(DataContext dataContext, UserManager<User> userManager, ILogger<ServiceRequestController> logger, IMapper mapper)
    {
        this._context = dataContext;
        _userManager = userManager;
        _logger = logger;
        _autoMapper = mapper;
    }

    [HttpGet]
    public ActionResult<IEnumerable<HotelDto>> GetAllHotels()
    {
        var result = _context.Hotels.ToList();

        var dtoList = _autoMapper.Map<IEnumerable<HotelDto>>(result);

        return Ok(dtoList);
    }


    [HttpGet]
    [Route("{id}")]
    public ActionResult<HotelDto> GetHotelById(int id)
    {
        var result = _context.Hotels.FirstOrDefault(h => h.Id == id);
        if (result == null)
        {
            return NotFound();
        }

        var dto = _autoMapper.Map<HotelDto>(result);

        return Ok(dto);
    }

    [HttpPost]
    [Authorize(Roles = RoleNames.Admin)]
    public ActionResult<HotelDto> CreateHotel(HotelDto dto)
    {
        var hotel = new Hotel
        {
            Name = dto.Name,
            Address = dto.Address,
            ManagerId = dto.ManagerId
        };

        _context.Hotels.Add(hotel);

        _context.SaveChanges();

        dto.Id = hotel.Id;

        return CreatedAtAction(nameof(GetHotelById), new { id = dto.Id }, dto);
    }

    [HttpPut]
    [Route("{id}")]
    [Authorize]
    public ActionResult<HotelDto> UpdateHotel(int id, HotelDto dto)
    {
        

        var hotel = _context.Hotels.FirstOrDefault(x => x.Id == id);
        if (hotel == null)
        {
            return NotFound();
        }

        if (!User.IsInRole(RoleNames.Admin) && User.GetCurrentUserId() != hotel.ManagerId)
        {
            return Forbid();
        }

        hotel.Name = dto.Name;
        hotel.Address = dto.Address;
        if (User.IsInRole(RoleNames.Admin))
        {
            hotel.ManagerId = dto.ManagerId;
        }

        _context.SaveChanges();

        dto.Id = hotel.Id;

        return Ok(dto);
    }

    [HttpDelete]
    [Route("{id}")]
    [Authorize]
    public ActionResult DeleteHotel(int id)
    {
        var hotel = _context.Hotels.FirstOrDefault(x => x.Id == id);
        if (hotel == null)
        {
            return NotFound();
        }

        if (!User.IsInRole(RoleNames.Admin) && User.GetCurrentUserId() != hotel.ManagerId)
        {
            return Forbid();
        }

        _context.Hotels.Remove(hotel);

        _context.SaveChanges();

        return Ok();
    }

    [HttpGet("SearchForHotel")]
    public IActionResult Search(string searchTerm)
    {
        if (string.IsNullOrWhiteSpace(searchTerm))
        {
            return BadRequest("Search term cannot be empty.");
        }

        var result = _context.Hotels
            .Where(h => EF.Functions.Like(h.Name, $"%{searchTerm}%") || EF.Functions.Like(h.Address, $"%{searchTerm}%"))
            .ToList();

        return Ok(result);
    }

}
