using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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

            return Ok(rooms);
        }
        catch(Exception ex)
        {
            _logger.LogError(ex, "An error occurred while processing the GetAllRooms request.");

            return BadRequest($"An error occurred: {ex.Message}");
        }
    }

    [HttpGet("GetRoomByAny")]
    public async Task<ActionResult<IEnumerable<Room>>> GetRooms(
       [FromQuery] int? packageId,
       [FromQuery] double? price,
       [FromQuery] int? roomNumber,
       [FromQuery] string? roomStatus,
       [FromQuery] int? hotelId)
    {
        IQueryable<Room> query = _context.Rooms
            .Include(r => r.Hotel)
            .Include(r => r.Package)
            .Include(r => r.RoomStatus);

        if (packageId.HasValue)
        {
            query = query.Where(r => r.PackageId == packageId);
        }

        if(hotelId.HasValue) 
        {
            query = query.Where(r => r.HotelId == hotelId);
        }

        if (price.HasValue)
        {
            query = query.Where(r => r.Price == price);
        }

        if (roomNumber.HasValue)
        {
            query = query.Where(r => r.RoomNumber == roomNumber);
        }

        if (roomStatus != null)
        {
            query = query.Where(r => r.RoomStatus.Status == roomStatus);
        }

        var rooms = await query.ToListAsync();
        return Ok(rooms);
    }

    [HttpPost("CreateRoom")]
    public async Task<ActionResult<RoomDTO>> CreateRoom(CreateRoomDTO roomDTO)
    {
        if (roomDTO == null)
        {
            return BadRequest("Input cannot be null");
        }

        var statusId = _context.UniversalStatuses.Where(us => us.Status == "Available").Select(us => us.Id).FirstOrDefault();

        var room = new Room
        {
            HotelId = roomDTO.HotelId,
            PackageId = roomDTO.PackageId,
            Price = roomDTO.Price,
            RoomNumber = roomDTO.RoomNumber,
            RoomStatusId = statusId
        };

        _context.Rooms.Add(room);
        _context.SaveChanges();

        var roomDTOToReturn = _autoMapper.Map<RoomDTO>(room);

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

        return Ok(roomPackage);
    }

    [HttpPost("SetRoomStatusToOccupied")]
    public async Task<ActionResult<bool>> SetRoomStatusToOccupied(int roomId)
    {
        var room = await _context.Rooms
            .FindAsync(roomId);

        var statusId = await _context.UniversalStatuses
            .Where(us => us.Status == "Occupied")
            .Select(us => us.Id)
            .FirstOrDefaultAsync();

        if(room == null)
        {
            return NotFound($"Could not find room with the id: {roomId}");
        }

        room.RoomStatusId = statusId;

        _context.Update(room);
        _context.SaveChanges();

        return Ok(true);
    } 
    
    [HttpPost("SetRoomStatusToAvailable")]
    public async Task<ActionResult<bool>> SetRoomStatusToAvailable(int roomId)
    {
        var room = await _context.Rooms
            .FindAsync(roomId);

        var statusId = await _context.UniversalStatuses
            .Where(us => us.Status == "Available")
            .Select(us => us.Id)
            .FirstOrDefaultAsync();

        if(room == null)
        {
            return NotFound($"Could not find room with the id: {roomId}");
        }

        room.RoomStatusId = statusId;

        _context.Update(room);
        _context.SaveChanges();

        return Ok(true);
    }

    [HttpPut("UpdateRoomPrice")]
    public async Task<ActionResult<bool>> UpdateRoomPrice(int roomId, double price)
    {
        var room = await _context.Rooms.FindAsync(roomId);

        if(room == null)
        {
            return NotFound($"Could not find room with the id: {roomId}");
        }

        room.Price = price;

        _context.Rooms.Update(room);
        _context.SaveChanges(); 

        return Ok(true);       
    }    
    
    [HttpPut("UpdateRoomPackage")]
    public async Task<ActionResult<bool>> UpdateRoomPackage(int roomId, int packageId)
    {
        var room = await _context.Rooms.FindAsync(roomId);

        if(room == null)
        {
            return NotFound($"Could not find room with the id: {roomId}");
        }

        room.PackageId = packageId;

        _context.Rooms.Update(room);
        _context.SaveChanges();

        return Ok(true);       
    }

    [HttpDelete("DeleteRoom")]
    public async Task<ActionResult<bool>> DeleteRoom(int id)
    {
        var room = await _context.Rooms.FindAsync(id);

        if(room == null)
        {
            return NotFound($"Could not find room with the id: {id}");
        }
        _context.Rooms.Remove(room);
        _context.SaveChanges();

        return Ok(true);
    }   
    
    [HttpDelete("DeleteRoomPackage")]
    public async Task<ActionResult<bool>> DeleteRoomPackage(int id)
    {
        var room = await _context.RoomsPackage.FindAsync(id);

        if(room == null)
        {
            return NotFound($"Could not find room package with the id: {id}");
        }
        _context.RoomsPackage.Remove(room);
        _context.SaveChanges();

        return Ok(true);
    }
}
