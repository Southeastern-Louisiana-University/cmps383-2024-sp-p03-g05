using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Data;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.HotelRoom;

namespace Selu383.SP24.Api.Controllers;

[Route("api/room")]
[ApiController]
public class RoomController : ControllerBase
{
    private readonly DataContext _context;
    private readonly UserManager<User> _userManager;
    private readonly ILogger<ServiceRequestController> _logger;
    private readonly IMapper _autoMapper;

    public RoomController(DataContext dataContext, UserManager<User> userManager, ILogger<ServiceRequestController> logger, IMapper mapper)
    {
        this._context = dataContext;
        _userManager = userManager;
        _logger = logger;
        _autoMapper = mapper;
    }

    [HttpPost("CreateRoom")]
    public async Task<ActionResult<RoomDTO>> CreateRoom (RoomDTO roomDTO)
    {
        if(roomDTO  == null)
        {
            return BadRequest("Input cannot be null");
        }

        var room = new Room
        {
            HotelId = roomDTO.HotelId,
            PackageId = roomDTO.PackageId,
            Price = roomDTO.Price,
            RoomNumber = roomDTO.RoomNumber,
            RoomStatusId = roomDTO.RoomStatusId
        };

        _context.Rooms.Add(room);
        _context.SaveChanges();

      var roomDTOToReturn =  _autoMapper.Map<RoomDTO>(room);


        return roomDTOToReturn;
    }

    [HttpPost("CreateRoomPackage")]
    public async Task<ActionResult<RoomPackage>> CreatePackage(string description)
    {
        var roomPackage = new RoomPackage
        {
            Description = description
        };

        _context.RoomsPackage.Add(roomPackage);
        _context.SaveChanges();

        return Ok();
    }



    [HttpGet("GetAllRooms")]
    public async Task<ActionResult<List<RoomDTO>>> GetAllRooms()
    {
        try
        {
            var rooms = await _context.Rooms
                .Include(r => r.Hotel)
                .Include(r => r.Package)
                .Include(r => r.RoomStatus)
                .ToListAsync();

            var roomDTO = _autoMapper.Map<List<RoomDTO>>(rooms);

            return roomDTO;
        }
        catch(Exception ex)
        {
            _logger.LogError(ex, "An error occurred while processing the GetAllRooms request.");

            return BadRequest($"An error occurred: {ex.Message}");
        }
    }


}
