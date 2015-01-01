using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using VideoDemoProject.Constant;
using VideoDemoProject.DataRepository;
using VideoDemoProject.GlobalUtility;
using VideoDemoProject.Lib;
using VideoDemoProject.Models;

namespace VideoDemoProject.Controllers
{
    public class VideoController : ApiController
    {
      // private readonly IDataRepository<Video> _videoDataRepository;
       //private readonly GlobalLib _globalLibContext;

   

        //public VideoController(GlobalLib globalLibContext)
        //{
        //    //_videoDataRepository = videoDataRepository;
        //    _globalLibContext = globalLibContext;
        //}
        [Route("api/Video/getVideo")]
        [HttpGet]
        public IHttpActionResult GetVideo()
        {
            return Ok();
        }
        [HttpPost]
        [Route("api/Video/uploadVideo")]
        public IHttpActionResult UploadVideo()
        {
            //try
            //{
            //    var uploadFolder = AppSettingsUtil.VideoPath + StringConstants.Temp + '/';
            //    //  var contentId = '1';
            //    //var path = uploadFolder + contentId + "/";
            //    HttpPostedFile fileData = HttpContext.Current.Request.Files["file"];
            //    var result = _globalLibContext.UploadPictures(fileData, uploadFolder);
            //    var file = new Video();
            //    file.VideoContentGuId = result;
            //    return Ok();
            //}
            //catch (Exception ex)
            //{

            //    throw ex;
            //}
            return Ok();
        }
    }
}
