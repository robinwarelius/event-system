using AutoMapper;
using Calcifer.Services.EventAPI.Models;
using Calcifer.Services.EventAPI.Models.Dtos;

namespace Calcifer.Services.EventAPI.DataMapping
{
    public class Mapping
    {
        public static MapperConfiguration RegisterMaps()
        {
            var mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<EventDto, Event>().ReverseMap();
                config.CreateMap<EventRequestDto, Event>().ReverseMap();
            });
            return mappingConfig;
        }
    }
}
