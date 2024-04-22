using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.Hotels;
using Selu383.SP24.Api.Migrations;

namespace Selu383.SP24.Api.Data;

public static class SeedHelper
{
    public static async Task MigrateAndSeed(IServiceProvider serviceProvider)
    {
        var dataContext = serviceProvider.GetRequiredService<DataContext>();

        await dataContext.Database.MigrateAsync();

        await AddHotels(dataContext);
        await AddRoles(serviceProvider);
        await AddUsers(serviceProvider);
    }

    private static async Task AddUsers(IServiceProvider serviceProvider)
    {
        const string defaultPassword = "Password123!";
        var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

        if (userManager.Users.Any())
        {
            return;
        }

        var adminUser = new User { UserName = "galkadi" };
        await userManager.CreateAsync(adminUser, defaultPassword);
        await userManager.AddToRoleAsync(adminUser, RoleNames.Admin);

        var bob = new User { UserName = "bob" };
        await userManager.CreateAsync(bob, defaultPassword);
        await userManager.AddToRoleAsync(bob, RoleNames.User);

        var sue = new User { UserName = "sue" };
        await userManager.CreateAsync(sue, defaultPassword);
        await userManager.AddToRoleAsync(sue, RoleNames.User);
    }

    private static async Task AddRoles(IServiceProvider serviceProvider)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<Role>>();

        await roleManager.CreateAsync(new Role { Name = RoleNames.Admin });

        await roleManager.CreateAsync(new Role { Name = RoleNames.User });
        await roleManager.CreateAsync(new Role { Name = RoleNames.Customer });
        await roleManager.CreateAsync(new Role { Name = RoleNames.Manager });
        await roleManager.CreateAsync(new Role { Name = RoleNames.Employee });
    }

    private static async Task AddHotels(DataContext dataContext)
    {
        var hotels = dataContext.Hotels.ToList();

        if (hotels.Any(h => h.Name == "Placeholder 0"))
        {
            return;
        }

        for (int i = 0; i < 2; i++)
        {
            dataContext
                .Set<Hotel>()
                .Add(new Hotel { Name = "Placeholder " + i, Address = "PlaceHolder" });
        }

        await dataContext.SaveChangesAsync();
    }
}
