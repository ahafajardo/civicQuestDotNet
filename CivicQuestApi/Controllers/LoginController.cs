using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CivicQuestApi.Models;
using CivicQuestApi.Services;

namespace CivicQuestApi.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        public AuthenticateService _authService;

        public LoginController(AuthenticateService authService)
        {
            _authService = authService;
        }

        [HttpGet]
        public ActionResult ToLogin()
        {
            return Ok();
        }

        // POST: api/login/ with body
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<LoginCreds>> CreateToken([FromBody]LoginCreds attempt)
        {

            var user = await _authService.Authenticate(attempt);

            if (user != null)
            {
                var tokenString = _authService.BuildToken(user);
                return Ok(new { token = tokenString });
            }

            return ValidationProblem();
        }
    }
}
