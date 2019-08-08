using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CivicQuestApi.Models;
using CivicQuestApi.Services;

namespace CivicQuestApi.Controllers
{
    [Route("api/time")]
    [ApiController]
    public class TimesheetsController : ControllerBase
    {

        public TimesheetsService _timeService;
        public TimesheetsController(TimesheetsService timeService)
        {
            _timeService = timeService;
        }

        // GET: api/time
        [HttpGet("{userId}"), Authorize]
        public async Task<ActionResult> GetTimesheets(long userId)
        {
            var timesheets = await _timeService.GetTimesheets(userId);
            return Ok(timesheets);
        }

        // GET: api/time/{id}
        [HttpGet("{userId}/{id}"), Authorize]
        public async Task<ActionResult> GetTimesheet(long id, long userId)
        {
            var timesheet = await _timeService.GetTimesheet(id, userId);

            if (timesheet == null)
                return NotFound();
            return Ok(timesheet);
        }

        [HttpPost("{userId}/{id}"), Authorize]
        public async Task<ActionResult> PostTimesheet(long id, long userId, [FromBody]Timesheet sheet)
        {
            var timesheet = await _timeService.PostTimesheet(id, userId, sheet);

            return CreatedAtAction(nameof(PostTimesheet), timesheet);
        }

        // PUT: api/time/{id}
        [HttpPut("{userId}/{id}"), Authorize]
        public async Task<ActionResult> PutTimesheet(long id, long userId, Timesheet sheet)
        {
            if (id != sheet.id)
            {
                return BadRequest();
            }
            await _timeService.PutTimesheet(id, userId, sheet);

            return NoContent();
        }

        // DELETE: api/time/{id}
        [HttpDelete("{userId}/{id}"), Authorize]
        public async Task<ActionResult> DeleteTimesheet(long id, long userId)
        {
            var timesheet = await _timeService.DeleteTimesheet(id, userId);
            if (timesheet == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
