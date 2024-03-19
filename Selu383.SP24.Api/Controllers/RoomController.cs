using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Selu383.SP24.Api.Data;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.HotelRoom;
using System.Reflection;

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
    [HttpGet("GetAvailableRooms")]
    public async Task<ActionResult<IEnumerable<RoomDTO>>> GetAvailableRooms(int hotelId, DateTime startDate, DateTime endDate)
    {
        if (startDate > endDate)
        {
            return BadRequest("The start date must be before the end date.");
        }

        // Step 1: Identify rooms with reservations that overlap the given date range
        var reservedRoomIds = await _context.Reservations
            .Where(reservation => reservation.ReservationEndDate > startDate
                               && reservation.ReservationStartDate < endDate
                               && reservation.Room.HotelId == hotelId)
            .Select(reservation => reservation.RoomId)
            .Distinct()
            .ToListAsync();

        // Step 2: Query for rooms in the given hotel that are not in the list of reservedRoomIds
        var availableRooms = await _context.Rooms
            .Where(room => room.HotelId == hotelId && !reservedRoomIds.Contains(room.Id))
            .Include(room => room.Hotel)
            .Include(room => room.Package)
            .Include(room => room.RoomStatus)
            .Select(room => new RoomDTO
            {
                Id = room.Id,
                Hotel = room.Hotel.Name,
                Package = room.Package.Description,
                Price = room.Price,
                RoomNumber = room.RoomNumber,
                RoomStatus = room.RoomStatus.Status,
            })
            .ToListAsync();

        return Ok(availableRooms);
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

    [HttpGet("GetAllPackages")]
    public async Task<ActionResult<RoomPackage>> GetAllPackages()
    {
        var result = await _context.RoomsPackage.ToListAsync();

        return Ok(result);
    }

    [HttpGet("GetAllAvailablePackages")]
    public async Task<ActionResult<RoomPackage>> GetAllAvailablePackages()
    {
        var result = await _context.Rooms.Where(r => r.RoomStatusId == 5).Select(r => r.Package).ToListAsync();

        return Ok(result);
    }

    [HttpGet("GetPackagesByHotelId")]
    public async Task<ActionResult<List<RoomPackage>>> GetPackageByHotelId(int hotelId)
    {

        var room = await _context.Rooms.FirstOrDefaultAsync(r => r.HotelId == hotelId);

        if (room == null)
        {
            return NotFound();
        }

        var packages = await _context.RoomsPackage.Where(rp => rp.Id == room.PackageId).ToListAsync();

        return Ok(packages);
    }

    [HttpPost("CreateRoom")]
    public async Task<ActionResult<RoomDTO>> CreateRoom(CreateRoomDTO roomDTO)
    {
        if (roomDTO == null)
        {
            return BadRequest("Input cannot be null");
        }

        var statusId = await _context.UniversalStatuses.Where(us => us.Status == "Available").Select(us => us.Id).FirstOrDefaultAsync();

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
    public async Task<ActionResult<RoomPackage>> CreatePackage(string description, string title, double price)
    {
        var roomPackage = new RoomPackage
        {
            Title = title,
            Description = description,
            StartingPrice = price
            
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
