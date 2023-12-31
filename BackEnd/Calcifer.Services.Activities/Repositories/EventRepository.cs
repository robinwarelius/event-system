using Calcifer.Services.EventAPI.Data;
using Calcifer.Services.EventAPI.Models;
using Calcifer.Services.EventAPI.Repositories.IRepositories;

namespace Calcifer.Services.EventAPI.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly ApplicationDbContext _db;
        public EventRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Event>> GetAllAsync()
        {
            return _db.Events.ToList();
        }

        public async Task<Event> GetAsync(Guid id)
        {
            return _db.Events.FirstOrDefault(item => item.EventId == id);
        }

        public async Task<Event> AddAsync(Event entity)
        {
            _db.Events.Add(entity);
            await _db.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> DeleteAsync(Event entity)
        {
            _db.Events.Remove(entity);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<Event> UpdateAsync(Event entity)
        {
            _db.Events.Update(entity);
            await _db.SaveChangesAsync();
            return entity;
        }
    }
}
