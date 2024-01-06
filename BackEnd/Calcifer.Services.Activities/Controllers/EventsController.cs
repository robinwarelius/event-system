using Calcifer.Services.EventAPI.Models.Dtos;
using Calcifer.Services.EventAPI.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace Calcifer.Services.EventAPI.Controllers
{
    [Route("api/events")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IEventService _eventService;
        private EventResponseDto _responseDto;
        private readonly ILogger<EventsController> _logger;

        public EventsController(IEventService eventService, ILogger<EventsController> logger)
        {
            _eventService = eventService;
            _responseDto = new EventResponseDto();
            _logger = logger;
        }

        [HttpGet("GetEvents")]
        public async Task<EventResponseDto> GetEvents()
        {
            try
            {
                var result = await _eventService.GetAllAsync();
                _responseDto.Result = result;
            }
            catch (Exception ex)
            {
                _responseDto.Message = ex.Message.ToString();
                _responseDto.IsSuccess = false;
                _logger.LogWarning($"Endpoint: GetEvents | {_responseDto.Message}");
            }
            return _responseDto;
        }

        [HttpGet("GetEvent/{id}")]
        public async Task<EventResponseDto> GetEvent(Guid id)
        {
            try
            {
                var result = await _eventService.GetAsync(id);
                _responseDto.Result = result;

                if (result == null)
                {
                    _responseDto.IsSuccess = false;
                    _responseDto.Message = "Something went wrong";
                }
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Message = ex.Message.ToString();
                _logger.LogWarning($"Endpoint: GetEvent | Data: {id} | {_responseDto.Message}");
            }

            return _responseDto;
        }

        [HttpPost("AddEvent")]
        public async Task<EventResponseDto> AddEvent([FromBody] EventRequestDto requestDto)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = await _eventService.AddAsync(requestDto);
                    _responseDto.Result = result;
                }
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Message = ex.Message.ToString();
                _logger.LogWarning($"Endpoint: AddEvent | Data: {requestDto} | {_responseDto.Message}");
            }
            return _responseDto;
        }

        [HttpDelete("DeleteEvent/{id}")]
        public async Task<EventResponseDto> DeleteEvent(Guid id)
        {
            try
            {
                var result = await _eventService.DeleteAsync(id);
                _responseDto.Result = result;

                if (!result)
                {
                    _responseDto.IsSuccess = false;
                    _responseDto.Message = "Something went wrong";
                }
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Message = ex.Message.ToString();
                _logger.LogWarning($"Endpoint: DeleteEvent | Data: {id} | {_responseDto.Message}");
            }

            return _responseDto;
        }

        [HttpPut("UpdateEvent")]
        public async Task<EventResponseDto> UpdateEvent([FromBody] EventDto eventDto)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = await _eventService.UpdateAsync(eventDto);
                    _responseDto.Result = result;

                    if (result == null)
                    {
                        _responseDto.IsSuccess = false;
                        _responseDto.Message = "Something went wrong";
                    }
                }
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Message = ex.Message.ToString();
                _logger.LogWarning($"Endpoint: UpdateEvent | Data: {eventDto} | {_responseDto.Message}");
            }
            return _responseDto;
        }
    }
}
