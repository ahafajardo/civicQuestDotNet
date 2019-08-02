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
using System.Text;
using CivicQuestApi.Models;

namespace CivicQuestApi.Controllers
{
    [Route("api/time")]
    [ApiController]
    public class TimesheetsController : ControllerBase
    {
        public TimesheetsController() { }

        [HttpGet, Authorize]
        public ActionResult ToTimesheets()
        {
            return Redirect("../timesheets.html");
        }
    }
}
