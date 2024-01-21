using AutoMapper;
using Calcifer.Services.EventAPI.DataMapping;
using System.Runtime.CompilerServices;

namespace Calcifer.Services.EventAPI.Extensions
{
    public static class AutomapperExtension
    {
        public static IServiceCollection AddAutomapper(this IServiceCollection services, IConfiguration config)
        {
            IMapper mapper = Mapping.RegisterMaps().CreateMapper();
            services.AddSingleton(mapper);
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            return services;
        }
    }
}
