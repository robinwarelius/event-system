using Serilog;

namespace Calcifer.Services.EventAPI.Extensions
{
    public static class SerilogExtension
    {
        public static IHostBuilder UseSerilog(this IHostBuilder hostBuilder)
        {
            hostBuilder.UseSerilog((HostBuilderContext context, IServiceProvider services, LoggerConfiguration loggerConfiguration) => {
                loggerConfiguration
                .ReadFrom.Configuration(context.Configuration)
                .ReadFrom.Services(services);
            });

            return hostBuilder;
        }
    }
}
