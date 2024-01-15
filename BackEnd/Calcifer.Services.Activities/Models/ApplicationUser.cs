using Microsoft.AspNetCore.Identity;

namespace Calcifer.Services.EventAPI.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string AdditionalInformation { get; set; }
    }
}
