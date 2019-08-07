using Microsoft.EntityFrameworkCore;
using CivicQuestApi.Models;

namespace CivicQuestApi.Services
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
