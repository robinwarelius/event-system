using Calcifer.Services.EventAPI.Data;
using Calcifer.Services.EventAPI.Models;
using Calcifer.Services.EventAPI.Services.IServices;
using Calcifer.Services.EventAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Calcifer.Services.EventAPI.Extensions
{
    public static class IdentityExtensions
    {
        public static IServiceCollection AddIdentity (this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentityCore<ApplicationUser>(options =>
            {
                options.Password.RequireNonAlphanumeric = false;
                options.User.RequireUniqueEmail = true;
            }).AddEntityFrameworkStores<ApplicationDbContext>();


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            services.AddScoped<ITokenService, TokenService>();
            return services;
        }
    }
}
