using Microsoft.EntityFrameworkCore;
using CivicQuestApi.Models;

namespace CivicQuestApi.Services
{
    public class CQContext : DbContext
    {
        public CQContext(DbContextOptions<CQContext> options) : base(options) { }

        public DbSet<CQItem> CQItems { get; set; }
    }
}
