namespace Selu383.SP24.Api.Features.HotelReservations;

public class ReservationDTO
{
    public int Id { get; set; }
    public string Hotel { get; set; } = string.Empty;
    public string HotelAddress { get; set; } = string.Empty;
    public int RoomNumber { get; set; }
    public int GuestId { get; set; }
    public string Status { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime ReservationStartDate { get; set; }
    public DateTime ReservationEndDate { get; set; }
}

public class CreateReservationDTO
{
    public int HotelId { get; set; }
    public int RoomId { get; set; }
}
