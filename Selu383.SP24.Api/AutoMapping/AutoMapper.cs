
using AutoMapper;
using Selu383.SP24.Api.Features.HotelReservations;
using Selu383.SP24.Api.Features.HotelRoom;
using Selu383.SP24.Api.Features.Hotels;
using Selu383.SP24.Api.Features.HotelServices;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<ServiceRequest, ServiceRequestDTO>();

        CreateMap<Room, RoomDTO>();

        CreateMap<Hotel, HotelDto>();

        CreateMap<Reservation, ReservationDTO>()
                   .ForMember(dest => dest.Hotel, opt => opt.MapFrom(src => src.Hotel.Name))
                   .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.Status))
                   .ForMember(dest => dest.RoomNumber, opt => opt.MapFrom(src => src.Room.RoomNumber));
                   
    }
}
