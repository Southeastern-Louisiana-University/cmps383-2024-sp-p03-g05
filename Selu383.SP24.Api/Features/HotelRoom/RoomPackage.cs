namespace Selu383.SP24.Api.Features.HotelRoom
{
    public class RoomPackage
    { 
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double StartingPrice { get; set; }

    }
}
