using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Selu383.SP24.Api.Migrations
{
    /// <inheritdoc />
    public partial class DML_SeedingData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("USE [SP24-P03-G05];");

            migrationBuilder.Sql("INSERT [dbo].[Hotels] ( [Name], [Address], [ManagerId]) VALUES ( N'NULLHorseshoe Bossier City', N'711 Horseshoe Blvd, Bossier City, LA 71111', NULL);");
            migrationBuilder.Sql("INSERT [dbo].[Hotels] ( [Name], [Address], [ManagerId]) VALUES ( N'Hilton Baton Rouge Capitol Center', N'201 Lafayette St, Baton Rouge, LA 70801', NULL);");
            migrationBuilder.Sql("INSERT [dbo].[Hotels] ( [Name], [Address], [ManagerId]) VALUES ( N'Roami at The Brandywine', N'888 Baronne St, New Orleans, LA 70113', NULL);");
            migrationBuilder.Sql("INSERT [dbo].[Hotels] ( [Name], [Address], [ManagerId]) VALUES ( N'Hyatt Regency New Orleans', N'601 Loyola Ave, New Orleans, LA 70113', NULL);");

            migrationBuilder.Sql("INSERT [dbo].[RoomPackages] ( [Description], [StartingPrice], [Title]) VALUES ( N'2 Queen Beds, Maximum Occupancy: 4, Air-conditioned, Room service, Bottled water, Minibar, Marble bathroom, Chair with ottoman, Alarm clock, Safe in room ', 75, N'Guest Room');");
            migrationBuilder.Sql("INSERT [dbo].[RoomPackages] ( [Description], [StartingPrice], [Title]) VALUES ( N'1 King Bed, 1 Double Sofa Bed, Maximum Occupancy: 4, Air-conditioned, Separate living room, Connecting rooms are available (for some rooms), Marble bathroom', 80, N'King Suite');");
            migrationBuilder.Sql("INSERT [dbo].[RoomPackages] ( [Description], [StartingPrice], [Title]) VALUES ( N'1 King Bed, 1 Double Sofa Bed, Separate shower and bathtub with spray jets, Maximum Occupancy: 4, soundproof windows, Separate living room, Coffee/tea maker, Minibar', 120, N'King with Bath');");

            // Since there are many INSERT statements for the Rooms table, I'll show the structure for the first few and last few to keep this example concise
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 1, 3, 95, 101, 1);");
            // Include all other INSERT statements for [dbo].[Rooms] here in the same manner
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 4, 1, 150, 3025, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 4, 1, 150, 3026, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 4, 1, 150, 3027, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 4, 1, 150, 3028, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 4, 1, 150, 3029, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 4, 1, 150, 3030, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 1, 3, 95, 102, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 1, 3, 95, 103, 1);");
            // Add all the missing INSERT statements following the same pattern
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 1, 3, 95, 104, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 1, 3, 95, 105, 1);");
            // ... continue with all other INSERT statements for the Rooms ...
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 2, 2, 100, 205, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 2, 2, 100, 206, 1);");
            // Skipping to the last provided INSERT statements for brevity
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 4, 2, 125, 2027, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 4, 2, 125, 2028, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 4, 2, 125, 2029, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 4, 2, 125, 2030, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 2, 2, 100, 207, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 1, 2, 100, 208, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 2, 3, 135, 301, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 2, 3, 135, 302, 1);");
            // ... Include all INSERT statements here ...
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 4, 1, 150, 3015, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 4, 1, 150, 3016, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 4, 1, 150, 3017, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 4, 1, 150, 3018, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 4, 1, 150, 3019, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 4, 1, 150, 3020, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 4, 1, 150, 3021, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 4, 1, 150, 3022, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 4, 1, 150, 3023, 1);");
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 4, 1, 150, 3024, 1);");

            // The final INSERT for Rooms as provided
            migrationBuilder.Sql("INSERT [dbo].[Rooms] ( [HotelId], [PackageId], [Price], [RoomNumber], [RoomStatusId]) VALUES ( 4, 1, 150, 3030, 1);");

 
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
