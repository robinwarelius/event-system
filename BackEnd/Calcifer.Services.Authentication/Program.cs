using AutoMapper;
using Calcifer.Services.AuthAPI.DataMapping;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

//Serilog
builder.Host.UseSerilog((HostBuilderContext context, IServiceProvider services, LoggerConfiguration loggerConfiguration) => {
    loggerConfiguration
    .ReadFrom.Configuration(context.Configuration)
    .ReadFrom.Services(services);
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DB
//builder.Services.AddDbContext<ApplicationDbContext>(opt => {
//    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnetion"));
//});

// Automapper
IMapper mapper = Mapping.RegisterMaps().CreateMapper();
builder.Services.AddSingleton(mapper);
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

//// Services
//builder.Services.AddScoped<IActivityService, ActivityService>();

//// Repos
//builder.Services.AddScoped<IActivityRepository, ActivityRepository>();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
