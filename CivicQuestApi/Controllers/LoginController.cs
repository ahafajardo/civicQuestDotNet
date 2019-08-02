using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CivicQuestApi.Models;

namespace CivicQuestApi.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly LoginContext _context;
        private readonly UserContext _userContext;
        private IConfiguration _config;

        public LoginController(LoginContext context, UserContext userContext, IConfiguration config)
        {
            _context = context;
            _userContext = userContext;
            _config = config;

            if (_context.LoginCredentials.Count() == 0)
            {
                // Create a new LoginCreds if collection is empty,
                // which means you can't delete all LoginCreds.
                _context.LoginCredentials.Add(new LoginCreds { userName = "bird", password = "bureau" });
                _context.SaveChanges();
            }
            if (_userContext.Users.Count() == 0)
            {
                // Create a new LoginCreds if collection is empty,
                // which means you can't delete all LoginCreds.
                _userContext.Users.Add(new User { userName = "bird", name = "Better Bird", role = "volunteer" });
                _userContext.SaveChanges();
            }
        }

        [HttpGet]
        public ActionResult ToLogin()
        {
            return Redirect("../");
        }

        // POST: api/login/ with body
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<LoginCreds>> CreateToken([FromBody]LoginCreds attempt)
        {

            var user = await Authenticate(attempt);

            if (user != null)
            {
                var tokenString = BuildToken(user);
                return Ok(new { token = tokenString });
            }

            return Unauthorized();
        }

        private string BuildToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
            _config["Jwt:Issuer"],
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private async Task<User> Authenticate(LoginCreds attempt)
        {
            User user = null;
            var login = await _context.LoginCredentials.Where(l => l.userName == attempt.userName && l.password == attempt.password).SingleOrDefaultAsync();
            if (login != null)
                user = await _userContext.Users.Where(u => u.userName == attempt.userName).SingleOrDefaultAsync();
            return user;
        }
    }
}
