using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.HotelReservations;
using Selu383.SP24.Api.Features.HotelRoom;
using Selu383.SP24.Api.Features.Hotels;
using Selu383.SP24.Api.Features.HotelServices;
using NetTopologySuite.Geometries;



namespace Selu383.SP24.Api.Data;

public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public DataContext()
    {
    }
    public virtual DbSet<ServiceRequest> ServiceRequests { get; set; }
    public virtual DbSet<UniversalStatus> UniversalStatuses { get; set; }
    public virtual DbSet<Room> Rooms { get; set; }
    public virtual DbSet<RoomPackage> RoomsPackage { get; set; }
    public virtual DbSet<Reservation> Reservations { get; set; }
    public virtual DbSet<Hotel> Hotels { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);

       
    }


}


