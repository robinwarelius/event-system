using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Calcifer.Services.AuthAPI.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ILogger <AuthController> _logger;
        public AuthController(ILogger<AuthController> logger)
        {
            _logger = logger;
        }
    }
}
