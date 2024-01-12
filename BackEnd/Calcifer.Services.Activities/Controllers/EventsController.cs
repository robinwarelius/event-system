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
        public async Task<ActionResult<EventResponseDto>> GetEvents()
        {
            try
            {
                var result = await _eventService.GetAllAsync();
                _responseDto.Result = result;
                return Ok(_responseDto);
            }
            catch (Exception ex)
            {
                _responseDto.Message = ex.Message.ToString();
                _responseDto.IsSuccess = false;
                _logger.LogWarning($"Endpoint: GetEvents | {_responseDto.Message}");
                return StatusCode(500, _responseDto); 
            }
        }

        [HttpGet("GetEvent/{id}")]
        public async Task<ActionResult<EventResponseDto>> GetEvent(Guid id)
        {
            try
            {
                var result = await _eventService.GetAsync(id);

                if (result == null)
                {
                    _responseDto.IsSuccess = false;
                    _responseDto.Message = "Event not found.";
                    return NotFound(_responseDto);
                }
                _responseDto.Result = result;
                return Ok(_responseDto);
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Message = "An error occurred processing your request.";
                _logger.LogWarning($"Endpoint: GetEvent | Data: {id} | {ex.Message}");
                return StatusCode(500, _responseDto);
            }
        }

        [HttpPost("AddEvent")]
        public async Task<ActionResult<EventResponseDto>> AddEvent([FromBody] EventRequestDto requestDto)
        {
            if (!ModelState.IsValid)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Message = "Invalid request data";
                return BadRequest(_responseDto);
            }
            try
            {
                var result = await _eventService.AddAsync(requestDto);
                _responseDto.Result = result;
                return Ok(_responseDto);
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Message = "An error occurred while processing your request.";
                _logger.LogError($"Endpoint: AddEvent | Data: {requestDto} | Exception: {ex.Message}");
                return StatusCode(500, _responseDto);
            }
        }

        [HttpDelete("DeleteEvent/{id}")]
        public async Task<ActionResult<EventResponseDto>> DeleteEvent(Guid id)
        {
            try
            {
                var result = await _eventService.DeleteAsync(id);
                if (!result)
                {
                    _responseDto.IsSuccess = false;
                    _responseDto.Message = "Event not found or could not be deleted";
                    return NotFound(_responseDto);
                }
                return Ok(_responseDto);
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Message = "An error occurred while processing your request.";
                _logger.LogError($"Endpoint: DeleteEvent | Data: {id} | Exception: {ex.Message}");
                return StatusCode(500, _responseDto);
            }
        }

        [HttpPut("UpdateEvent")]
        public async Task<ActionResult<EventResponseDto>> UpdateEvent([FromBody] EventDto eventDto)
        {
            if (!ModelState.IsValid)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Message = "Invalid request data";
                return BadRequest(_responseDto);
            }
            try
            {
                var result = await _eventService.UpdateAsync(eventDto);

                if (result == null)
                {
                    _responseDto.IsSuccess = false;
                    _responseDto.Message = "Event not found or could not be updated";
                    return NotFound(_responseDto);
                }

                _responseDto.Result = result;
                return Ok(_responseDto);
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Message = "An error occurred while processing your request.";
                _logger.LogError($"Endpoint: UpdateEvent | Data: {eventDto} | Exception: {ex.Message}");
                return StatusCode(500, _responseDto);
            }
        }
    }
}
