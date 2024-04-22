using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Controllers;
using Selu383.SP24.Api.Data;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.Hotels;
using System.Text.RegularExpressions;

namespace Selu383.SP24.Api.Services.ServiceClasses
{
    public class HotelService : IHotelService
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        private readonly ILogger<ServiceRequestController> _logger;
        private readonly IMapper _autoMapper;

        public HotelService(
            DataContext dataContext,
            UserManager<User> userManager,
            ILogger<ServiceRequestController> logger,
            IMapper mapper
        )
        {
            this._context = dataContext;
            _userManager = userManager;
            _logger = logger;
            _autoMapper = mapper;
        }

        public async Task<IEnumerable<HotelDto>> GetAllHotels()
        {
            var result = await _context.Hotels.ToListAsync();

            var dtoList = _autoMapper.Map<IEnumerable<HotelDto>>(result);

            return dtoList;
        }

        public async Task<HotelDto> GetHotelById(int id)
        {
            var result = await _context.Hotels.FirstOrDefaultAsync(h => h.Id == id);
            if (result == null)
            {
                throw new KeyNotFoundException($"Hotel with ID {id} was not found.");
            }

            var dto = _autoMapper.Map<HotelDto>(result);

            return dto;
        }

        public async Task<HotelDto> CreateHotel(HotelDto dto)
        {
            var hotel = new Hotel
            {
                Name = dto.Name,
                Address = dto.Address,
                ManagerId = dto.ManagerId,
                PhoneNumber = FormatPhoneNumber(dto.PhoneNumber),
            };

            _context.Hotels.Add(hotel);

            _context.SaveChanges();

            dto.Id = hotel.Id;

            return dto;
        }

        private string FormatPhoneNumber(string phoneNumber)
        {
            // Remove non-numeric characters
            string digits = Regex.Replace(phoneNumber, @"\D", "");

            // Apply the formatting pattern
            return Regex.Replace(digits, @"(\d{3})(\d{3})(\d{4})", "($1) $2-$3");
        }

        public async Task<HotelDto> UpdateHotel(int id, HotelDto dto)
        {
            var hotel = await _context.Hotels.FirstOrDefaultAsync(x => x.Id == id);

            if (hotel == null)
            {
                throw new KeyNotFoundException($"Hotel with ID {id} was not found.");
            }

            hotel.Name = dto.Name;
            hotel.Address = dto.Address;
            hotel.PhoneNumber = dto.PhoneNumber;

            await _context.SaveChangesAsync();

            dto.Id = hotel.Id;

            return dto;
        }

        public async Task<bool> DeleteHotel(int id)
        {
            var hotel = await _context.Hotels.FirstOrDefaultAsync(x => x.Id == id);
            if (hotel == null)
            {
                throw new KeyNotFoundException($"Hotel with ID {id} was not found.");
            }

            _context.Hotels.Remove(hotel);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
