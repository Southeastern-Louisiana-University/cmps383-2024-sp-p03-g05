using System.ComponentModel.DataAnnotations;

namespace Selu383.SP24.Api.Features.Authorization;

public class CreateCustomerDto
{
    [Required]
    public string UserName { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string FistName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;

}