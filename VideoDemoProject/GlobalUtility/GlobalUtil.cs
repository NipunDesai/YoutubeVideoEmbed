using log4net;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Web;

namespace VideoDemoProject.GlobalUtility
{
    public class GlobalUtil
    {
        /// <summary>
        /// Method for Handling and logging Exceptions.
        /// </summary>
        /// <param name="ex"></param>
        /// <param name="callingType"> </param>
        public static void HandleAndLogException(Exception ex, object callingType)
        {
            HandleAndLogException(ex, callingType.GetType());
        }

        /// <summary>
        /// Method for Handling and logging Exceptions.
        /// </summary>
        /// <param name="ex"></param>
        /// <param name="callingType"> </param>
        public static void HandleAndLogException(Exception ex, Type callingType)
        {
            var log = LogManager.GetLogger(callingType);
            if (log.IsErrorEnabled)
            {
                log.Error(ex.Message, ex);
                throw ex;
            }
        }

        /// <summary>
        /// Returns description of enum value. ----- pooja shah.
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string GetEnumDescription(Enum value)
        {
            FieldInfo fi = value.GetType().GetField(value.ToString());

            DescriptionAttribute[] attributes =
                (DescriptionAttribute[])fi.GetCustomAttributes(
                typeof(DescriptionAttribute),
                false);

            if (attributes != null && attributes.Length > 0)
                return attributes[0].Description;
            else
                return value.ToString();
        }
    }
}