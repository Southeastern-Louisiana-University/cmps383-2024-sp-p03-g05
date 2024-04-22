namespace Selu383.SP24.Api.Features.HotelRoom;

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
    public int RoomNumber { get; set; }
}
