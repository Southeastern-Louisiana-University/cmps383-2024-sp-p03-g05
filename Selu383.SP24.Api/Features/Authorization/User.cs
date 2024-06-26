using Microsoft.AspNetCore.Identity;
using Selu383.SP24.Api.Features.Hotels;

namespace Selu383.SP24.Api.Features.Authorization;

public class User : IdentityUser<int>
{
    public virtual ICollection<UserRole> Roles { get; set; } = new List<UserRole>();

    public virtual ICollection<Hotel> Hotels { get; set; } = new List<Hotel>();

    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public bool CardOnFile { get; set; }
}
