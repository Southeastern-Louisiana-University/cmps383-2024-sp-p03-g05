using Microsoft.AspNetCore.Mvc;
using Selu383.SP24.Api.Features.HotelReservations;
using Selu383.SP24.Api.Features.HotelRoom;

namespace Selu383.SP24.Api.Services;

public interface IReservationService 
{
    Task<IEnumerable<ReservationDTO>> GetAllReservationsAsync();
    Task<IEnumerable<ReservationDTO>> GetReservationsBetweenDatesAsync(DateTime startDate, DateTime endDate);
    Task<IEnumerable<ReservationDTO>> GetReservationsByAnyAsync(int? hotelId, int? roomId, int? roomNumber, string? reservationStatus, DateTime? reservationDate);
    Task<ReservationDTO> CreateReservationAsync(int hotelId, int packageId, DateTime reservationStartDate, DateTime reservationEndDate);
}
