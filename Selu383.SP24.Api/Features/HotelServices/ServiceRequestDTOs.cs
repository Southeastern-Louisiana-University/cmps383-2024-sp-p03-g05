namespace Selu383.SP24.Api.Features.HotelServices
{

    public class ServiceRequestDTO
    {
        public int Id { get; set; }
        public string Request { get; set; } = string.Empty;
        public int CreatorId { get; set; }
        public int RoleId { get; set; }
        public int RoomNumber { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime CreateDate { get; set; }
      
    }

    public class CreateServiceRequestDTO
    {
        public string Request { get; set; } = string.Empty;
        public int RoomNumber { get; set; }
    }
}
