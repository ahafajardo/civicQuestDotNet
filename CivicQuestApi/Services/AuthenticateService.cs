using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using CivicQuestApi.Models;

namespace CivicQuestApi.Services
{
    public class AuthenticateService
    {
        private readonly LoginContext loginContext;
        private readonly UserContext userContext;
        private IConfiguration config;

        public AuthenticateService(LoginContext lContext, UserContext uContext, IConfiguration configuration)
        {
            loginContext = lContext;
            userContext = uContext;
            config = configuration;

            if (userContext.Users.Count() == 0)
            {
                // Create a new LoginCreds if collection is empty,
                // which means you can't delete all LoginCreds.
                userContext.Users.Add(new User { userName = "bird", password = "bureau", name = "Better Bird", role = "volunteer" });
                userContext.SaveChanges();
            }
        }

        public string BuildToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(config["Jwt:Issuer"],
            config["Jwt:Issuer"],
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<User> Authenticate(User attempt)
        {
            User user = await userContext.Users.Where(u => u.userName == attempt.userName && u.password == attempt.password).SingleOrDefaultAsync();
            return user;
        }
    }
}
