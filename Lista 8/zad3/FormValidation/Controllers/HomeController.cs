using FormValidation.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FormValidation.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var fuels = GetFuels();
            var model = new Samochod();
            model.Paliwa = GetSelectListItems(fuels);

            return View(model);
        }

        [HttpPost]
        public ActionResult Index(Samochod model)
        {
            var fuels = GetFuels();
            model.Paliwa = GetSelectListItems(fuels);
            if (ModelState.IsValid)
            {
                Session["Samochod"] = model;
                return RedirectToAction("Result");
            }

            return View("Index", model);
        }

        public ActionResult Result()
        {
            var model = Session["Samochod"] as Samochod;

            return View(model);
        }

        private IEnumerable<string> GetFuels()
        {
            return new List<string>
            {
                "P",
                "ON",
                "LPG",
                "EE",
            };
        }

        private IEnumerable<SelectListItem> GetSelectListItems(IEnumerable<string> elements)
        {
            var selectList = new List<SelectListItem>();
            foreach (var element in elements)
            {
                selectList.Add(new SelectListItem
                {
                    Value = element,
                    Text = element
                });
            }

            return selectList;
        }
    }
}