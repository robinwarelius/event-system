using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Calcifer.Services.EventAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Event",
                columns: table => new
                {
                    EventId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PlaceVenue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Details = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Event", x => x.EventId);
                });

            migrationBuilder.InsertData(
                table: "Event",
                columns: new[] { "EventId", "Category", "City", "Date", "Details", "PlaceVenue", "Title" },
                values: new object[,]
                {
                    { new Guid("39485834-bb59-4f2a-9bc3-b3d81c90cce1"), "travel", "Orebro", new DateTime(2024, 5, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Fest", "Torget", "Future Activity 3" },
                    { new Guid("72caf757-103b-42b2-8731-d938f7dca3f7"), "drinks", "Stockholm", new DateTime(2020, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Great Party", "Pub", "Past Activity 1" },
                    { new Guid("a125ca18-ee7e-468f-932a-e60fa408008e"), "music", "Varnamo", new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "Kom", "Lagan", "Future Activity 2" },
                    { new Guid("b9b291a6-b5c7-4de0-a611-3d719db50df1"), "film", "Uppsala", new DateTime(2024, 5, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Bio", "Stora Torget", "Future Activity 4" },
                    { new Guid("ce03d3c4-b2fc-4b7f-b042-1c93f93fb58d"), "culture", "Sundbyberg", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "lol", "Willys", "Future Activity 1" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Event");
        }
    }
}
