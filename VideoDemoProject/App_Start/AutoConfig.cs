using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using VideoDemoProject.Controllers;
using VideoDemoProject.DataRepository;
using VideoDemoProject.Lib;

namespace VideoDemoProject.App_Start
{
    public class AutoConfig
    {
        public static Autofac.IContainer RegisterDependencies()
        {

            var containerBuilder = new ContainerBuilder();

            //Register all Controller within current assembly
            containerBuilder.RegisterControllers(typeof(HomeController).Assembly);
            //Registers api controllers within the current assembly.
            containerBuilder.RegisterApiControllers(typeof(VideoController).Assembly);

            ////Registers DbContext
            //containerBuilder.RegisterType<ZanicuraDbContext>()
            //                .As<DbContext>()
            //                .InstancePerDependency();

            ////Register HttpContextBase
            //containerBuilder.RegisterType(typeof(HttpContextBase)).InstancePerDependency();

            //Register all lib
           containerBuilder.RegisterType(typeof(GlobalLib)).InstancePerDependency();

            //Registration of Generic DataRepository
            containerBuilder.RegisterGeneric(typeof(DataRepository<>)).As(typeof(IDataRepository<>)).InstancePerDependency();

            //Registration of ELearning Content Repository.
            //containerBuilder.RegisterType<VideoRepository>()
            //    .As<IVideoRepository>()
            //    .InstancePerDependency();

            var container = containerBuilder.Build();
            //container.ActivateGlimpse();

            //This will set dependency resolver for MVC
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));

            //This will set dependency resolver for WebAPI
            var resolver = new AutofacWebApiDependencyResolver(container);
            GlobalConfiguration.Configuration.DependencyResolver = resolver;
            return container;


        }
    }
}