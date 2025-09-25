using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class AlterarMatriculaParaIduser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Matricula",
                table: "RegistroHorarios",
                newName: "Iduser");

            migrationBuilder.AddColumn<string>(
                name: "Nome",
                table: "RegistroHorarios",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Nome",
                table: "RegistroHorarios");

            migrationBuilder.RenameColumn(
                name: "Iduser",
                table: "RegistroHorarios",
                newName: "Matricula");
        }
    }
}
