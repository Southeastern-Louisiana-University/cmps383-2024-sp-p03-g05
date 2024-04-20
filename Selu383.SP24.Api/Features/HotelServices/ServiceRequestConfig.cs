using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Selu383.SP24.Api.Features.HotelServices
{
    public class ServiceRequestConfig : IEntityTypeConfiguration<ServiceRequest>
    {
        public void Configure(EntityTypeBuilder<ServiceRequest> builder)
        {
            builder.ToTable("ServiceRequests");

            builder.HasKey(sr => sr.Id);
            builder
                .HasOne(sr => sr.RequestStatus)
                .WithMany()
                .HasForeignKey(sr => sr.RequestStatusId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }

    public class UniversalStatusConfig : IEntityTypeConfiguration<UniversalStatus>
    {
        public void Configure(EntityTypeBuilder<UniversalStatus> builder)
        {
            builder.ToTable("UniversalStatus");

            // Primary Key
            builder.HasKey(srs => srs.Id);
        }
    }
}
