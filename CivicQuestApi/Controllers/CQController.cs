using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CivicQuestApi.Models;

namespace CivicQuestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CQController : ControllerBase
    {
        private readonly CQContext _context;

        public CQController(CQContext context)
        {
            _context = context;

            if (_context.CQItems.Count() == 0)
            {
                // Create a new CQItem if collection is empty,
                // which means you can't delete all CQItems.
                _context.CQItems.Add(new CQItem { name = "volunteer" });
                _context.SaveChanges();
            }
        }

        // GET: api/CQ
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CQItem>>> GetCQItems()
        {
            return await _context.CQItems.ToListAsync();
        }

        // GET: api/CQ/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CQItem>> GetCQItem(long id)
        {
            var cqItem = await _context.CQItems.FindAsync(id);

            if (cqItem == null)
                return NotFound();
            return cqItem;
        }

    }
}