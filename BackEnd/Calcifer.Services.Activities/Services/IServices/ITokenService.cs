using Calcifer.Services.EventAPI.Models;

namespace Calcifer.Services.EventAPI.Services.IServices
{
    public interface ITokenService
    {
        string CreateToken(ApplicationUser user);
    }
}
