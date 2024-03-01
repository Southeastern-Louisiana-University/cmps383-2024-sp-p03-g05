using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Selu383.SP24.Api.Features.Hotels;
using Selu383.SP24.Api.Features.HotelServices;

namespace Selu383.SP24.Api.Features.HotelRoom
{
    public class RoomConfiguration : IEntityTypeConfiguration<Room>
    {
        public void Configure(EntityTypeBuilder<Room> builder)
        {
            builder.ToTable("Rooms"); 

            builder.HasKey(r => r.Id);

            builder.HasOne(r => r.Hotel)
                .WithMany()
                .HasForeignKey(r => r.HotelId);

            builder.HasOne(r => r.Package)
                .WithMany();

            builder.HasOne(r => r.UniversalStatus)
                .WithMany();
        }
    }
}

