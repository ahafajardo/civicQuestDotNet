using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CivicQuestApi.Models;

namespace CivicQuestApi.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly LoginContext _context;

        public LoginController(LoginContext context)
        {
            _context = context;

            if (_context.LoginCredentials.Count() == 0)
            {
                // Create a new LoginCreds if collection is empty,
                // which means you can't delete all LoginCreds.
                _context.LoginCredentials.Add(new LoginCreds { userName = "bird", password = "bureau" });
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public ActionResult ToLogin()
        {
            return Redirect("../");
        }

        // GET: api/login/attempt?userName=""&password=""
        [HttpGet("attempt")]
        public async Task<ActionResult<LoginCreds>> GetLoginCreds([FromQuery]string user, [FromQuery]string pass)
        {
            var loginCreds = await _context.LoginCredentials.Where(u => u.userName == user).SingleOrDefaultAsync();

            if (loginCreds == null)
                return RedirectPermanent("../login");
            if (loginCreds.password != pass)
                return RedirectPermanent("../login");
            return RedirectPermanent("../../timesheets.html");
        }
    }
}
