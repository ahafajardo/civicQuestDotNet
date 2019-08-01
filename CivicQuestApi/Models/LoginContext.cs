using Microsoft.EntityFrameworkCore;

namespace CivicQuestApi.Models
{
    public class LoginContext : DbContext
    {
        public LoginContext(DbContextOptions<LoginContext> options) : base(options) { }

        public DbSet<LoginCreds> LoginCredentials { get; set; }
    }
}
