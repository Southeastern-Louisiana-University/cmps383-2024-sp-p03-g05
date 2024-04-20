using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Selu383.SP24.Api.Migrations
{
    /// <inheritdoc />
    public partial class DDL_ChangeColumnToStringStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ServiceRequests_UniversalStatus_RequestStatusId",
                table: "ServiceRequests"
            );

            migrationBuilder.AlterColumn<int>(
                name: "RequestStatusId",
                table: "ServiceRequests",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int"
            );

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "ServiceRequests",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: ""
            );

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceRequests_UniversalStatus_RequestStatusId",
                table: "ServiceRequests",
                column: "RequestStatusId",
                principalTable: "UniversalStatus",
                principalColumn: "Id"
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ServiceRequests_UniversalStatus_RequestStatusId",
                table: "ServiceRequests"
            );

            migrationBuilder.DropColumn(name: "Status", table: "ServiceRequests");

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

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceRequests_UniversalStatus_RequestStatusId",
                table: "ServiceRequests",
                column: "RequestStatusId",
                principalTable: "UniversalStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade
            );
        }
    }
}
