using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Selu383.SP24.Api.Migrations
{
    /// <inheritdoc />
    public partial class DDL_AddFirstLastNameCardOnFileToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "CardOnFile",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false
            );

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: ""
            );

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: ""
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "CardOnFile", table: "AspNetUsers");

            migrationBuilder.DropColumn(name: "FirstName", table: "AspNetUsers");

            migrationBuilder.DropColumn(name: "LastName", table: "AspNetUsers");
        }
    }
}
