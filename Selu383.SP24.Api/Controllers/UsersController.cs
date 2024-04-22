using System.Transactions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Data;
using Selu383.SP24.Api.Features.Authorization;

namespace Selu383.SP24.Api.Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly UserManager<User> userManager;
    private readonly DataContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UsersController(
        UserManager<User> userManager,
        DataContext Context,
        IHttpContextAccessor httpContextAccessor
    )
    {
        this.userManager = userManager;
        _context = Context;
        this._httpContextAccessor = httpContextAccessor;
    }

    [HttpPost]
    // [Authorize(Roles = RoleNames.Admin)]
    public async Task<ActionResult<UserDto>> Create(CreateUserDto dto)
    {
        using var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

        var newUser = new User
        {
            UserName = dto.UserName,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
        };
        var createResult = await userManager.CreateAsync(newUser, dto.Password);
        if (!createResult.Succeeded)
        {
            return BadRequest();
        }

        try
        {
            var roleResult = await userManager.AddToRolesAsync(newUser, dto.Roles);
            if (!roleResult.Succeeded)
            {
                return BadRequest();
            }
        }
        catch (InvalidOperationException e)
            when (e.Message.StartsWith("Role") && e.Message.EndsWith("does not exist."))
        {
            return BadRequest();
        }

        transaction.Complete();

        return Ok(
            new UserDto
            {
                Id = newUser.Id,
                Roles = dto.Roles,
                UserName = newUser.UserName,
                FirstName = newUser.FirstName,
                LastName = newUser.LastName,
            }
        );
    }

    [HttpPost]
    [Route("signup")]
    // [Authorize(Roles = RoleNames.Admin)]
    public async Task<ActionResult<UserDto>> Create(CreateCustomerDto dto)
    {
        using var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

        var newUser = new User
        {
            UserName = dto.UserName,
            FirstName = dto.FistName,
            LastName = dto.LastName
        };
        var createResult = await userManager.CreateAsync(newUser, dto.Password);
        if (!createResult.Succeeded)
        {
            return BadRequest();
        }

        try
        {
            var roleResult = await userManager.AddToRolesAsync(newUser, ["Customer"]);
            if (!roleResult.Succeeded)
            {
                return BadRequest("Failed");
            }
        }
        catch (InvalidOperationException e)
            when (e.Message.StartsWith("Role") && e.Message.EndsWith("does not exist."))
        {
            return BadRequest("ROle doesn't exitst");
        }

        transaction.Complete();

        return Ok(
            new UserDto
            {
                Id = newUser.Id,
                Roles = ["Customer"],
                UserName = newUser.UserName,
                FirstName = newUser.FirstName,
                LastName = newUser.LastName
            }
        );
    }

    [HttpGet("GetCardOnFile")]
    public async Task<ActionResult<bool>> GetUserCardOnFile(int id)
    {
        var user = await userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);

        if (user == null)
        {
            return Unauthorized();
        }

        var cardOnFile = await _context
            .Users.Where(u => u.Id == id)
            .Select(u => u.CardOnFile)
            .FirstOrDefaultAsync();

        return Ok(cardOnFile);
    }

    [HttpPost("ToggleCardOnFile")]
    public async Task<ActionResult<bool>> ToggleCardOnFile(int userId)
    {
        var user = await _context.Users.FindAsync(userId);

        if (user == null)
        {
            return NotFound("User not found.");
        }

        user.CardOnFile = !user.CardOnFile;

        _context.Users.Update(user);
        await _context.SaveChangesAsync();

        return Ok(user.CardOnFile);
    }
}
