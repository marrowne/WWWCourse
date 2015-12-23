using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace zad2.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Gallery()
        {
            return View();
        }

        public ActionResult Contact()
        {
            return View();
        }

        public ActionResult Image(string id)
        {
            var dir = Server.MapPath("/Images");
            var path = Path.Combine(dir, id + ".jpg");
            return base.File(path, "image/jpeg");
        }
    }
}