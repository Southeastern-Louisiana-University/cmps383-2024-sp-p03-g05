using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Selu383.SP24.Api.Features.HotelRoom
{
    public class RoomPackageConfiguration : IEntityTypeConfiguration<RoomPackage>
    {
        public void Configure(EntityTypeBuilder<RoomPackage> builder)
        {
            builder.ToTable("RoomPackages");

            builder.HasKey(rp => rp.Id);
        }
    }
}
