using Calcifer.Services.EventAPI.Data;
using Calcifer.Services.EventAPI.Repositories.IRepositories;
using Calcifer.Services.EventAPI.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Calcifer.Services.EventAPI.Extensions
{
    public static class DbExtension
    {
        public static IServiceCollection AddDb (this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("DefaultConnetion"));
            });

            services.AddScoped<IEventRepository, EventRepository>();

            return services;    
        }
    }
}
