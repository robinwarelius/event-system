using AutoMapper;
using Calcifer.Services.EventAPI.Data;
using Calcifer.Services.EventAPI.DataMapping;
using Calcifer.Services.EventAPI.Repositories;
using Calcifer.Services.EventAPI.Repositories.IRepositories;
using Calcifer.Services.EventAPI.Services;
using Calcifer.Services.EventAPI.Services.IServices;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Calcifer.Services.EventAPI.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;

var builder = WebApplication.CreateBuilder(args);

//Serilog
builder.Host.UseSerilog();

builder.Services.AddControllers(options =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    options.Filters.Add(new AuthorizeFilter(policy));
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DB
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnetion"));
});

// Identity
builder.Services.AddIdentity(builder.Configuration);


// Identity
//builder.Services.AddIdentityCore<ApplicationUser>(options =>
//{
//    options.Password.RequireNonAlphanumeric = false;
//}).AddEntityFrameworkStores<ApplicationDbContext>();


//var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("EZ9]f{pdB-bU3(:Gv%;tN)&*hHC+s,nak`^$r2RLAm76Mu#Vx.\r\nn;Vwfq*~`.A':yd=)J<#pUk}S&48gTLrte9,^5B$s]R3W%?Q6a\r\nu48RC]E35{,&V*jaTsZv_gP/`^;~[?}'>tUr%z9+bhnQ.(6\"SF\r\ngJ+@pY.^L]Wk/e;>Zq5u[c2S~:}t&nv`{s=PT%MKVj6?xUGwEh\r\nUN2u}b_'Zd<J6csXT/$jKk)#;L@=YM7`5^P+a(yeW,?3~m:QwB"));

//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddJwtBearer(options =>
//    {
//        options.TokenValidationParameters = new TokenValidationParameters
//        {
//            ValidateIssuerSigningKey = true,
//            IssuerSigningKey = key,
//            ValidateIssuer = false,
//            ValidateAudience = false
//        };
//    });

// Automapper
IMapper mapper = Mapping.RegisterMaps().CreateMapper();
builder.Services.AddSingleton(mapper);
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Services
builder.Services.AddScoped<IEventService, EventService>();
//builder.Services.AddScoped<ITokenService, TokenService>();

//Repos
builder.Services.AddScoped<IEventRepository, EventRepository>();

// Cors
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
    });
});

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();

