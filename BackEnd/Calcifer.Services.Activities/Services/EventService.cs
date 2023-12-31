using AutoMapper;
using Calcifer.Services.EventAPI.Models;
using Calcifer.Services.EventAPI.Models.Dtos;
using Calcifer.Services.EventAPI.Repositories.IRepositories;
using Calcifer.Services.EventAPI.Services.IServices;

namespace Calcifer.Services.EventAPI.Services
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _eventRepo;
        private IMapper _mapper;

        public EventService(IEventRepository eventRepo, IMapper mapper)
        {
            _eventRepo = eventRepo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<EventDto>> GetAllAsync()
        {
            IEnumerable<Event> events = await _eventRepo.GetAllAsync();
            return _mapper.Map<IEnumerable<EventDto>>(events);
        }

        public async Task<EventDto> GetAsync(Guid id)
        {
            Event event01 = await _eventRepo.GetAsync(id);

            if (event01 == null)
                return null;

            return _mapper.Map<EventDto>(event01);
        }

        public async Task<EventDto> AddAsync(EventRequestDto requestDto)
        {
            Event event01 = await _eventRepo.AddAsync(_mapper.Map<Event>(requestDto));
            return _mapper.Map<EventDto>(event01);
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            Event event01  = await _eventRepo.GetAsync(id);
            if (event01 != null)
                return await _eventRepo.DeleteAsync(event01);
            return false;
        }

        public async Task<EventDto> UpdateAsync(EventDto eventDto)
        {
            Event event01 = await _eventRepo.GetAsync(eventDto.EventId);

            if (event01 == null)
                return null;

            event01.EventId = eventDto.EventId;
            event01.City = eventDto.City;
            event01.Category = eventDto.Category;
            event01.Date = eventDto.Date;
            event01.Details = eventDto.Details;
            event01.PlaceVenue = eventDto.PlaceVenue;
            event01.Title = eventDto.Title;
            Event updatedEvent = await _eventRepo.UpdateAsync(event01);
            return _mapper.Map<EventDto>(updatedEvent);
        }
    }
}