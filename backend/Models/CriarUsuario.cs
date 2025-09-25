using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class CriarUsuario
    {
        [Key] // key pimaria
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] //auto increment
        public int Iduser { get; set; }
        [Required]
        [Column(TypeName = "varchar(100)")]
        public string Nome { get; set; }
        [Required]
        [Column(TypeName = "varchar(150)")]
        public string Email { get; set; }
        [Required]
        [Column(TypeName = "varchar(255)")]
        public string Senha { get; set; }    
        [Required]
        [Column(TypeName = "int")]
        public int Matricula { get; set; }
    }

    public class VerificaUsuario
    {
        public string Email { get; set; }
        public string Senha { get; set; }
    }

    public class ReturnDadosLogin
    {
        public string Email { get; set; }
        public int Matricula { get; set; }
        public string Nome { get; set; }
        public int Iduser { get; set; }
    }
    
}

