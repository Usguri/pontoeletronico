using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class RegistrarHorario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Idregistro { get; set; }
        [Required]
        [Column(TypeName = "datetime")]
        public DateTime RegistroEntrada { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? RegistroSaida { get; set; }
        [Required]
        public int NumeroSemana { get; set; }
        [Required]
        public int Mes { get; set; }
        [Required]
        public int Dia { get; set; }
        [NotMapped]
        public string Nome { get; set; }
        [NotMapped]
        public int Matricula { get; set; }
        [Required]
        [ForeignKey("Usuario")]
        public int Iduser { get; set; }
    }
}