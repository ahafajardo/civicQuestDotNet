using Microsoft.EntityFrameworkCore;
using CivicQuestApi.Models;

namespace CivicQuestApi.Services
{
    public class TimesheetsContext : DbContext
    {
        public TimesheetsContext(DbContextOptions<TimesheetsContext> options) : base(options) { }

        public DbSet<Timesheet> Timesheets { get; set; }
    }
}
