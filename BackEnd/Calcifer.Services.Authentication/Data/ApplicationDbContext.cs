using Microsoft.EntityFrameworkCore;

namespace Calcifer.Services.AuthAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        //public virtual DbSet<Activity> Activities { get; set; }

    }
}
