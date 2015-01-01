using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace VideoDemoProject.Lib
{
    public class GlobalLib
    {
        public string UploadPictures(HttpPostedFile postedFile, string path)
        {

            // map path to directory in which images to be saved on server.
            string savepath = HttpContext.Current.Server.MapPath(path);
            string filename = postedFile.FileName;

            //Check for existance of directory. if not then create it.
            if (!Directory.Exists(savepath))
                Directory.CreateDirectory(savepath);

            // Create new GUID to rename file.
            var guid = Guid.NewGuid().ToString();
            //rename file with new GUID.
            string newFilename = guid + Path.GetExtension(filename);
            // map physical path on server in which images to be saved with new name.
            string physicalPath = Path.Combine(savepath, newFilename);
            postedFile.SaveAs(physicalPath);


            string fileExtension = Path.GetExtension(physicalPath);

            //Return url of image.
            return string.Concat(path, newFilename);

        }
    }
}