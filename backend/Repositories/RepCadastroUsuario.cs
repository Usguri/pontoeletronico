using backend.Models;
using backend.Data;
using Microsoft.AspNetCore.Identity;

namespace backend.Repositories
{
    public class RepCadastrousuario
    {
        private readonly ApplicationDbContext _context;
        private readonly IPasswordHasher<CriarUsuario> _passwordHasher;

        public RepCadastrousuario(ApplicationDbContext context, IPasswordHasher<CriarUsuario> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        public void CadastrarUsuario(CriarUsuario usuario) // Método para cadastrar
        {
            var senhaCriptografada = _passwordHasher.HashPassword(usuario, usuario.Senha); // Criptografa a senha antes de salvar
            usuario.Senha = senhaCriptografada;
            
            _context.Usuarios.Add(usuario);
            _context.SaveChanges();
        }
        
        public ReturnDadosLogin? VerificarLogin(string email, string senha) // Método para verificar o login
        {
            var usuario = _context.Usuarios.SingleOrDefault(u => u.Email == email);

            if (usuario == null)
            {
                return null;
            }

            var resultado = _passwordHasher.VerifyHashedPassword(usuario, usuario.Senha, senha);

                    if (resultado == PasswordVerificationResult.Success)
                    {
                        return new ReturnDadosLogin
                        {
                            Iduser = usuario.Iduser,
                            Nome = usuario.Nome,
                            Email = usuario.Email,
                            Matricula = usuario.Matricula
                        };
                    }

                    return null;
        }
    }
}