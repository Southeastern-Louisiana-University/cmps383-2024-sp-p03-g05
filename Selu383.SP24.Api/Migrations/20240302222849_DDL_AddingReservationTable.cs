using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Selu383.SP24.Api.Migrations
{
    /// <inheritdoc />
    public partial class DDL_AddingReservationTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Reservations",
                columns: table => new
                {
                    Id = table
                        .Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HotelId = table.Column<int>(type: "int", nullable: false),
                    RoomId = table.Column<int>(type: "int", nullable: false),
                    GuestId = table.Column<int>(type: "int", nullable: false),
                    StatusId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReservationDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reservations_AspNetUsers_GuestId",
                        column: x => x.GuestId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id"
                    );
                    table.ForeignKey(
                        name: "FK_Reservations_Hotel_HotelId",
                        column: x => x.HotelId,
                        principalTable: "Hotel",
                        principalColumn: "Id"
                    );
                    table.ForeignKey(
                        name: "FK_Reservations_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id"
                    );
                    table.ForeignKey(
                        name: "FK_Reservations_UniversalStatus_StatusId",
                        column: x => x.StatusId,
                        principalTable: "UniversalStatus",
                        principalColumn: "Id"
                    );
                }
            );

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_GuestId",
                table: "Reservations",
                column: "GuestId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_HotelId",
                table: "Reservations",
                column: "HotelId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_RoomId",
                table: "Reservations",
                column: "RoomId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_StatusId",
                table: "Reservations",
                column: "StatusId"
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "Reservations");
        }
    }
}
