using Calcifer.Services.EventAPI.Models.Dtos;

namespace Calcifer.Services.EventAPI.Services.IServices
{
    public interface IEventService
    {
        Task<IEnumerable<EventDto>> GetAllAsync();
        Task<EventDto> GetAsync(Guid id);
        Task<EventDto> UpdateAsync(EventDto eventDto);
        Task<EventDto> AddAsync(EventRequestDto RequestDto);
        Task<bool> DeleteAsync(Guid id);
    }
}
