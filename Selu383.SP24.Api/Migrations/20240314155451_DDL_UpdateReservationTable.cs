using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Selu383.SP24.Api.Migrations
{
    /// <inheritdoc />
    public partial class DDL_UpdateReservationTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ReservationDate",
                table: "Reservations",
                newName: "ReservationStartDate"
            );

            migrationBuilder.AddColumn<DateTime>(
                name: "ReservationEndDate",
                table: "Reservations",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "ReservationEndDate", table: "Reservations");

            migrationBuilder.RenameColumn(
                name: "ReservationStartDate",
                table: "Reservations",
                newName: "ReservationDate"
            );
        }
    }
}
