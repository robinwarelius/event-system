using System.ComponentModel.DataAnnotations;

namespace Calcifer.Services.EventAPI.Models.Dtos
{
    public class EventRequestDto
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string PlaceVenue { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public string? Details { get; set; }

        [Required]
        public string Category { get; set; }
    }
}
