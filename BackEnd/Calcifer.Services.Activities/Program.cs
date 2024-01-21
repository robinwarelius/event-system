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
builder.Services.AddDb(builder.Configuration);

// Identity
builder.Services.AddIdentity(builder.Configuration);

// Automapper
builder.Services.AddAutomapper(builder.Configuration);

// Services
builder.Services.AddScoped<IEventService, EventService>();

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

