using System.ComponentModel.DataAnnotations;

namespace Calcifer.Services.EventAPI.Models
{
    public class Event
    {
        [Key]
        public Guid EventId { get; set; }
        public string Title { get; set; }
        public string City { get; set; }
        public string PlaceVenue { get; set; }
        public DateTime Date { get; set; }
        public string Details { get; set; }
        public string Category { get; set; }
    }
}
