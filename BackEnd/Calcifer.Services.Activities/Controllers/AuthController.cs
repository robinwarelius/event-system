using Calcifer.Services.EventAPI.Models;
using Calcifer.Services.EventAPI.Models.Dtos;
using Calcifer.Services.EventAPI.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Calcifer.Services.EventAPI.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITokenService _tokenService;
        public AuthController(UserManager <ApplicationUser> userManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register([FromBody]RegisterDto registerDto)
        {
            if(await _userManager.Users.AnyAsync(item => item.UserName == registerDto.UserName))
            {
                return BadRequest("Username is already in use");
            };

            if (await _userManager.Users.AnyAsync(item => item.Email == registerDto.Email))
            {
                return BadRequest("Email is already in use");
            };

            var user = new ApplicationUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.UserName,
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if(result.Succeeded)
            {
                return new UserDto
                {
                    DisplayName = user.DisplayName,
                    Image = null,
                    Token = _tokenService.CreateToken(user),
                    UserName = user.DisplayName,
                };
            }

            return BadRequest(result.Errors);    
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login ([FromBody]LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if(user == null) return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (result)
            {
                return new UserDto
                {
                    DisplayName = user.DisplayName,
                    Image = null,
                    Token = _tokenService.CreateToken(user),
                    UserName = user.UserName
                };
            }

            return Unauthorized();          
        }


        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            // Hämta upp email från token som följer med i requesten från klienten....
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = null,
                Token = _tokenService.CreateToken(user),
                UserName = user.UserName
            };
        }
    }
}
