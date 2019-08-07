using Microsoft.EntityFrameworkCore;
using CivicQuestApi.Models;

namespace CivicQuestApi.Services
{
    public class LoginContext : DbContext
    {
        public LoginContext(DbContextOptions<LoginContext> options) : base(options) { }

        public DbSet<LoginCreds> LoginCredentials { get; set; }
    }
}
