using Microsoft.EntityFrameworkCore;

namespace register.Models
{
    public class UserContext :DbContext
    {
        public UserContext(DbContextOptions options): base(options)
        {

        }
        public DbSet<User> Users { get; set; }  
    }
}
