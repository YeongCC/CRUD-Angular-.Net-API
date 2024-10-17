using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class CustomerContext : DbContext
    {
        public CustomerContext(DbContextOptions<CustomerContext> options) : base(options) { }

        public DbSet<CustomerProfile> CustomerProfiles { get; set; }
    }
}
