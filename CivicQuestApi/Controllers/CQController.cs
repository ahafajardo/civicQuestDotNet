using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CivicQuestApi.Models;

namespace CivicQuestApi.Controllers
{
    [Route("api/cq")]
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

        // GET: api/cq
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CQItem>>> GetCQItems()
        {
            return await _context.CQItems.ToListAsync();
        }

        // GET: api/cq/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CQItem>> GetCQItem(long id)
        {
            var cqItem = await _context.CQItems.FindAsync(id);

            if (cqItem == null)
                return NotFound();
            return cqItem;
        }

        // POST: api/cq
        [HttpPost]
        public async Task<ActionResult<CQItem>> PostCQItem(CQItem item)
        {
            _context.CQItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCQItem), new CQItem { id = item.id }, item);
        }

        // PUT: api/cq/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCQItem(long id, CQItem item)
        {
            if (id != item.id)
            {
                return BadRequest();
            }
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/cq/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCQItem(long id)
        {
            var cqItem = await _context.CQItems.FindAsync(id);
            if (cqItem == null)
            {
                return NotFound();
            }
            _context.Remove(cqItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}