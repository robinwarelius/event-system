using Calcifer.Services.EventAPI.Models;

namespace Calcifer.Services.EventAPI.Repositories.IRepositories
{
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> GetAllAsync();
        Task<Event> GetAsync(Guid id);
        Task<Event> AddAsync(Event entity);
        Task<bool> DeleteAsync(Event entity);
        Task<Event> UpdateAsync(Event entity);
    }
}
