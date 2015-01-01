using System;
using System.Web.Mvc;

namespace VideoDemoProject.Controllers
{
    public class JasmineController : Controller
    {
        public ViewResult Run()
        {
            return View("SpecRunner");
        }
    }
}
