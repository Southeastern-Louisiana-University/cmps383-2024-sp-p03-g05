
using AutoMapper;
using Selu383.SP24.Api.Features.HotelRoom;
using Selu383.SP24.Api.Features.HotelServices;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<ServiceRequest, ServiceRequestDTO>();

        CreateMap<Room, RoomDTO>();
    }
}
