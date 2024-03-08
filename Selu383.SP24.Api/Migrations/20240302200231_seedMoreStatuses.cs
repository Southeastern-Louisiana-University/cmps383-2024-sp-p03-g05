using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Selu383.SP24.Api.Migrations
{
    /// <inheritdoc />
    public partial class seedMoreStatuses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"-- Insert 'Available'
                                    INSERT INTO UniversalStatus (Status) VALUES ('Available');

                                    -- Insert 'Occupied'
                                    INSERT INTO UniversalStatus (Status) VALUES ('Occupied');
                                    ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
