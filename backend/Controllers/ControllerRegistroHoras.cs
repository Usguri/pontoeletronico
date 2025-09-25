using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Repositories;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using System.Globalization;

namespace backend.Controllers
{
    [ApiController]
    [Route("api")]
    public class UsuariosController : ControllerBase
    {
        private readonly RepCadastrousuario _repository;
        private readonly string _jwtSecret = "26eeddfbeb0caa30b68a82aa6cb5e38631acf2f5369c2d95c9665d6836401588";

        public UsuariosController(RepCadastrousuario repository)
        {
            _repository = repository;
        }

        [HttpPost("cadastrar_usuario")]
        public ActionResult<CriarUsuario> Cadastrar([FromBody] CriarUsuario usuario)
        {
            _repository.CadastrarUsuario(usuario);
            return Ok(usuario);
        }

        [HttpPost("login")]
        public ActionResult Login([FromBody] VerificaUsuario login)
        {
            var usuario = _repository.VerificarLogin(login.Email, login.Senha);
            if (usuario == null) return Unauthorized(new { success = false, message = "Email ou senha incorretos" });

            // JWT é gerado
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtSecret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, usuario.Email),
                    new Claim("UserId", usuario.Iduser.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                success = true,
                message = "Login realizado com sucesso",
                token = tokenString,
                usuario
            });
        }
    }


    // ------------------------------ registrar horario
    [ApiController]
    [Route("api")]
    [Authorize] // garante que somente usuarios logador podem requisitar
    public class HorarioController : ControllerBase
    {
        private readonly HorarioRepository _repository;

        public HorarioController(HorarioRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("registrar_horario_entrada")]
        public async Task<ActionResult> Registrar([FromQuery] int iduser)
        {

            var registro = new RegistrarHorario
            {
                RegistroEntrada = DateTime.Now,
                RegistroSaida = null,
                NumeroSemana = CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(
                                DateTime.Now,
                                CalendarWeekRule.FirstFourDayWeek,
                                DayOfWeek.Monday),
                Mes = DateTime.Now.Month,
                Dia = (int)DateTime.Now.DayOfWeek,
                Iduser = iduser
            };

            await _repository.RegistrarHorarioAsync(registro);
            return Ok(new { success = true, registro });
        }

        [HttpPut("registrar_horario_saida")]
        public async Task<ActionResult> Atualizar(int idregistro)
        {
            var registroSaida = DateTime.Now;

            var sucesso = await _repository.AtualizarHorarioSaidaAsync(idregistro, registroSaida);
            if (!sucesso) return NotFound("Registro não encontrado");

            return Ok(new { Idregistro = idregistro, RegistroSaida = registroSaida });

        }

        [HttpGet("buscar_horarios_semanal")]
        public async Task<ActionResult<IEnumerable<RegistrarHorario>>> BuscarSemanal(int numeroSemana, int iduser)
        {
            var resultado = await _repository.BuscarHorariosSemanalAsync(numeroSemana, iduser);
            return Ok(resultado);
        }

        [HttpGet("buscar_horarios_mensal")]
        public async Task<ActionResult<IEnumerable<RegistrarHorario>>> BuscarMensal(int mes, int iduser)
        {
            var resultado = await _repository.BuscarHorarioMensalAsync(mes, iduser);
            return Ok(resultado);
        }
    }

    [Route("api")]
    public class RegistrosController : ControllerBase
    {
        [HttpGet("meus_registros")]
        [Authorize]
        public IActionResult GetMeusRegistros()
        {
            var userId = User.FindFirst("UserId")?.Value;
            return Ok(new { message = $"Registros do usuário {userId}" });
        }
    }


}