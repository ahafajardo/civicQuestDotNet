using Microsoft.EntityFrameworkCore;

namespace CivicQuestApi.Models
{
    public class CQContext : DbContext
    {
        public CQContext(DbContextOptions<CQContext> options) : base(options) { }

        public DbSet<CQItem> CQItems { get; set; }
    }
}