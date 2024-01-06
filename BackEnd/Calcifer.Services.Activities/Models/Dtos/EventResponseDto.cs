namespace Calcifer.Services.EventAPI.Models.Dtos
{
    public class EventResponseDto
    {
        public object Result { get; set; }
        public string Message { get; set; } = "";
        public bool IsSuccess { get; set; } = true;
    }
}
