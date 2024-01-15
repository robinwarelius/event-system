using Calcifer.Services.EventAPI.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Calcifer.Services.EventAPI.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions <ApplicationDbContext> options) : base(options)
        {
        }

        public virtual DbSet<Event> Events { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Event>().ToTable(nameof(Event));

            string eventsJson = File.ReadAllText("events.json");
            List<Event> events = JsonSerializer.Deserialize<List<Event>>(eventsJson);
            modelBuilder.Entity<Event>().HasData(events.Select(item => item));
        }
    }
}
