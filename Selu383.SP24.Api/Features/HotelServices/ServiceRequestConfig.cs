using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Selu383.SP24.Api.Features.HotelServices
{
    public class ServiceRequestConfig : IEntityTypeConfiguration<ServiceRequest>
    {
        public void Configure(EntityTypeBuilder<ServiceRequest> builder)
        {
            builder.ToTable("ServiceRequests");

            // Primary Key
            builder.HasKey(sr => sr.Id);
  
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

