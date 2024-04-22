using Microsoft.AspNetCore.Mvc;
using Selu383.SP24.Api.Features.Hotels;

namespace Selu383.SP24.Api.Services
{
    public interface IHotelService
    {
        Task<IEnumerable<HotelDto>> GetAllHotels();
        Task<HotelDto> GetHotelById(int id);
        Task<HotelDto> CreateHotel(HotelDto dto);
        Task<HotelDto> UpdateHotel(int id, HotelDto dto);
        Task<bool> DeleteHotel(int id);
    }
}
