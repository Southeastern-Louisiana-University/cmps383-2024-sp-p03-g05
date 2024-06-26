﻿using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.HotelRoom;
using Selu383.SP24.Api.Features.Hotels;
using Selu383.SP24.Api.Features.HotelServices;

namespace Selu383.SP24.Api.Features.HotelReservations;

public class Reservation
{
    public int Id { get; set; }
    public int HotelId { get; set; }
    public Hotel? Hotel { get; set; }
    public int RoomId { get; set; }
    public Room? Room { get; set; }
    public int GuestId { get; set; }
    public User? Guest { get; set; }
    public int StatusId { get; set; }
    public UniversalStatus? Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime ReservationStartDate { get; set; }
    public DateTime ReservationEndDate { get; set; }
}
