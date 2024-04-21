using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Selu383.SP24.Api.Migrations
{
    /// <inheritdoc />
    public partial class DDL_UpdatedRoomTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RoomId1",
                table: "Reservations",
                type: "int",
                nullable: true
            );

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_RoomId1",
                table: "Reservations",
                column: "RoomId1"
            );

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Rooms_RoomId1",
                table: "Reservations",
                column: "RoomId1",
                principalTable: "Rooms",
                principalColumn: "Id"
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Rooms_RoomId1",
                table: "Reservations"
            );

            migrationBuilder.DropIndex(name: "IX_Reservations_RoomId1", table: "Reservations");

            migrationBuilder.DropColumn(name: "RoomId1", table: "Reservations");
        }
    }
}
