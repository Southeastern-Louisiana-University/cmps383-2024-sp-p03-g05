using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Selu383.SP24.Api.Migrations
{
    /// <inheritdoc />
    public partial class DML_addingData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"INSERT INTO UniversalStatus  (Status) VALUES
                   ('Pending'),
                   ('Started'),
                   ('Finished'),
                   ('Cancelled');");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
