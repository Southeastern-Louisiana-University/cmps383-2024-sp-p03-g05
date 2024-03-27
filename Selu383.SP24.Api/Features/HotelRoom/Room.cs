using Selu383.SP24.Api.Features.HotelReservations;
using Selu383.SP24.Api.Features.Hotels;
using Selu383.SP24.Api.Features.HotelServices;

namespace Selu383.SP24.Api.Features.HotelRoom;

public class Room
{
    public int Id { get; set; }
    public int HotelId { get; set; }
    public Hotel? Hotel { get; set; }
    public int PackageId { get; set; }
    public RoomPackage? Package { get; set; }
    public double Price { get; set; }
    public int RoomNumber { get; set; }
    public int RoomStatusId { get; set; }
    public UniversalStatus? RoomStatus { get; set; }
    // Directly navigate to Reservations from Room
    public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
}


public class RoomDTO
{
    public int Id { get; set; }
    public string Hotel { get; set; }
    public string Package { get; set; }
    public double Price { get; set; }
    public int RoomNumber { get; set; }
    public string RoomStatus { get; set; } 
}

public class CreateRoomDTO
{
    public int HotelId { get; set; }
    public int PackageId { get; set; }
    public double Price { get; set; }
    public int RoomNumber { get; set;}
}
