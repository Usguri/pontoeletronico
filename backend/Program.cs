using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Repositories;
using Microsoft.AspNetCore.Identity;
using backend.Models;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
.AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
});

// Config CORS - ok
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
      policy =>
      {
          policy.WithOrigins("http://localhost:4200")
        .AllowAnyHeader()
        .AllowAnyMethod();
      });
});

// Configuração do Entity Framework + MySQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
options.UseMySql(
    builder.Configuration.GetConnectionString("DefaultConnection"),
    new MySqlServerVersion(new Version(8, 0, 0))
));

builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();

// Serviços de usuário
builder.Services.AddScoped<IPasswordHasher<CriarUsuario>, PasswordHasher<CriarUsuario>>();
builder.Services.AddScoped<RepCadastrousuario>();
builder.Services.AddScoped<HorarioRepository>();

// Adiciona autenticação JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes("26eeddfbeb0caa30b68a82aa6cb5e38631acf2f5369c2d95c9665d6836401588"))
    };
});
builder.Services.AddAuthorization();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection(); // http para https
app.UseCors(MyAllowSpecificOrigins); // permite call front
app.UseAuthentication(); // autenticação JWT
app.UseAuthorization(); // autorização
app.MapControllers();
app.Run();