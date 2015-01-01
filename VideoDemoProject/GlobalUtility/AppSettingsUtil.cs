using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace VideoDemoProject.GlobalUtility
{
    public class AppSettingsUtil
    {
        private static string _currenntDomain;

        public static string CurrentDomain
        {
            get
            {
                if (HttpContext.Current == null)
                    return _currenntDomain;
                return HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority);
            }
            set { _currenntDomain = value; }
        }


        public static string VideoPath
        {
            get { return ConfigurationManager.AppSettings["VideoFiles"]; }
        }
    }
}