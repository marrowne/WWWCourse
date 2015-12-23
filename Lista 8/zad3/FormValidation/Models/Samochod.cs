using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FormValidation.Models
{
    public class Samochod
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Podaj numer rejestracyjny")]
        [Display(Name = "Numer rejestracyjny")]
        [RegularExpression("[A-Z]{2,3}[0-9]{4,6}", ErrorMessage = "Niepoprawny numer rejestracyjny")]
        public string NrRej { get; set; }
        
        [Required(ErrorMessage = "Podaj datę rejestracji")]
        [Display(Name = "Data rejestracji")]
        [DataType(DataType.Date)]
        public string DataRej { get; set; }
        
        [Required(ErrorMessage = "Podaj markę pojazdu")]
        [RegularExpression("[A-Za-z]*", ErrorMessage = "Nazwa powinna składać się wyłącznie z liter")]
        public string Marka { get; set; }
        
        [Required(ErrorMessage = "Podaj kod pocztowy")]
        [Display(Name = "Rok produkcji")]
        [RegularExpression("[0-9]{4}", ErrorMessage = "Niepoprawny rok")]
        public string Produkcja { get; set; }

        [Required(ErrorMessage = "Podaj rodzaj paliwa")]
        public string Paliwo { get; set; }

        public IEnumerable<SelectListItem> Paliwa { get; set; }
    }
}