namespace Selu383.SP24.Api.Features.HotelServices
{

    public class ServiceRequestDTO
    {
        public int Id { get; set; }
        public int CreatorId { get; set; }
        public int RoleId { get; set; }
        public int RoomNumber { get; set; }
        public int RequestStatusId { get; set; }
        public DateTime CreatedAt { get; set; }
      
    }

    public class CreateServiceRequestDTO
    {
        public string Request {  get; set; }
        public int RoomNumber { get; set; }
    }
}
