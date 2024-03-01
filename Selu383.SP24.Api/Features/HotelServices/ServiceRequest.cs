using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.HotelRoom;

namespace Selu383.SP24.Api.Features.HotelServices;

    public class UniversalStatus
    {
       public int Id { get; set; }
       public string Status { get; set; } = string.Empty;
    }
    public class ServiceRequest
    {
        public int Id { get; set; }
        public string Request { get; set; } = string.Empty;
        public int CreatorId { get; set; }
        public User? User { get; set; }
        public int RoleId { get; set; }
        public UniversalStatus? RequestStatus { get; set; }
        public string Status { get; set; } = string.Empty;
        public Room? Room { get; set; }
        public int RoomNumber { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

    }

