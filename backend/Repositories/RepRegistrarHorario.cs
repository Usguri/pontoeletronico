using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

public class HorarioRepository
{
    private readonly ApplicationDbContext _context;

    public HorarioRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task RegistrarHorarioAsync(RegistrarHorario entity)
    {
        _context.RegistroHorarios.Add(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> AtualizarHorarioSaidaAsync(int idregistro, DateTime registroSaida)
    {
        var registro = await _context.RegistroHorarios.FindAsync(idregistro);
        if (registro == null) return false;

        registro.RegistroSaida = registroSaida;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<List<RegistrarHorario>> BuscarHorariosSemanalAsync(int numeroSemana, int iduser)
    {
        return await _context.RegistroHorarios
            .Join(_context.Usuarios,
                h => h.Iduser,
                u => u.Iduser,
                (h, u) => new RegistrarHorario {
                    Idregistro = h.Idregistro,
                    RegistroEntrada = h.RegistroEntrada,
                    RegistroSaida = h.RegistroSaida,
                    NumeroSemana = h.NumeroSemana,
                    Mes = h.Mes,
                    Dia = h.Dia,
                    Iduser = h.Iduser,
                    Nome = u.Nome,
                    Matricula = u.Matricula
                })
            .Where(x => x.NumeroSemana == numeroSemana && x.Iduser == iduser)
            .ToListAsync();
    }

    public async Task<List<RegistrarHorario>> BuscarHorarioMensalAsync(int mes, int iduser)
    {
        return await _context.RegistroHorarios
            .Join(_context.Usuarios,
                h => h.Iduser,
                u => u.Iduser,
                 (h, u) => new RegistrarHorario {
                 Idregistro = h.Idregistro,
                 RegistroEntrada = h.RegistroEntrada,
                 RegistroSaida = h.RegistroSaida,
                 NumeroSemana = h.NumeroSemana,
                 Mes = h.Mes,
                 Dia = h.Dia,
                 Iduser = h.Iduser,
                 Nome = u.Nome,
                 Matricula = u.Matricula
            })
            .Where(x => x.Mes == mes && x.Iduser == iduser)
            .ToListAsync();
    }
}