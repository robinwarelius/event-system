using AutoMapper;

namespace Calcifer.Services.AuthAPI.DataMapping
{
    public class Mapping
    {
        public static MapperConfiguration RegisterMaps()
        {
            var mappingConfig = new MapperConfiguration(config =>
            {
                //config.CreateMap<ActivityDto, Activity>().ReverseMap();
            });
            return mappingConfig;
        }
    }
}
