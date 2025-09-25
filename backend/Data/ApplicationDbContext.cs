using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<CriarUsuario> Usuarios { get; set; }
        public DbSet<RegistrarHorario> RegistroHorarios { get; set; }

    }
}