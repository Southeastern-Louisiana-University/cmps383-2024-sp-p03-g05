using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Selu383.SP24.Api.Migrations
{
    /// <inheritdoc />
    public partial class AlterTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_UniversalStatus_UniversalStatusId",
                table: "Rooms"
            );

            migrationBuilder.DropForeignKey(
                name: "FK_ServiceRequests_Rooms_RoomId",
                table: "ServiceRequests"
            );

            migrationBuilder.DropIndex(name: "IX_Rooms_UniversalStatusId", table: "Rooms");

            migrationBuilder.DropColumn(name: "RoomNumber", table: "ServiceRequests");

            migrationBuilder.DropColumn(name: "Status", table: "ServiceRequests");

            migrationBuilder.DropColumn(name: "Status", table: "Rooms");

            migrationBuilder.DropColumn(name: "UniversalStatusId", table: "Rooms");

            migrationBuilder.AlterColumn<int>(
                name: "RoomId",
                table: "ServiceRequests",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true
            );

            migrationBuilder.AlterColumn<int>(
                name: "RequestStatusId",
                table: "ServiceRequests",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true
            );

            migrationBuilder.AddColumn<int>(
                name: "RoomStatusId",
                table: "Rooms",
                type: "int",
                nullable: false,
                defaultValue: 0
            );

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "RoomPackages",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255
            );

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_RoomStatusId",
                table: "Rooms",
                column: "RoomStatusId"
            );

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_UniversalStatus_RoomStatusId",
                table: "Rooms",
                column: "RoomStatusId",
                principalTable: "UniversalStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade
            );

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceRequests_Rooms_RoomId",
                table: "ServiceRequests",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_UniversalStatus_RoomStatusId",
                table: "Rooms"
            );

            migrationBuilder.DropForeignKey(
                name: "FK_ServiceRequests_Rooms_RoomId",
                table: "ServiceRequests"
            );

            migrationBuilder.DropIndex(name: "IX_Rooms_RoomStatusId", table: "Rooms");

            migrationBuilder.DropColumn(name: "RoomStatusId", table: "Rooms");

            migrationBuilder.AlterColumn<int>(
                name: "RoomId",
                table: "ServiceRequests",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int"
            );

            migrationBuilder.AlterColumn<int>(
                name: "RequestStatusId",
                table: "ServiceRequests",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int"
            );

            migrationBuilder.AddColumn<int>(
                name: "RoomNumber",
                table: "ServiceRequests",
                type: "int",
                nullable: false,
                defaultValue: 0
            );

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "ServiceRequests",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: ""
            );

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Rooms",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: ""
            );

            migrationBuilder.AddColumn<int>(
                name: "UniversalStatusId",
                table: "Rooms",
                type: "int",
                nullable: true
            );

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "RoomPackages",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)"
            );

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_UniversalStatusId",
                table: "Rooms",
                column: "UniversalStatusId"
            );

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_UniversalStatus_UniversalStatusId",
                table: "Rooms",
                column: "UniversalStatusId",
                principalTable: "UniversalStatus",
                principalColumn: "Id"
            );

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceRequests_Rooms_RoomId",
                table: "ServiceRequests",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id"
            );
        }
    }
}
