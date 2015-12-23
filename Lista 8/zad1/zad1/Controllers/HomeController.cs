using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace zad1.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //return Content("Hello");
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            //return View();

            String Foo = "This is my foo string.";
            var foo = new List<string>
            {
                "A1",
                "B2",
                "C3"
            };
            return Json(foo, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            //return View();
            return RedirectToAction("About");
        }
    }
}