/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/typings/angularjs/angular-resource.d.ts" />




interface IApp extends ng.IModule { }

// Create the module and define its dependencies.
var myApp: IApp = angular.module('myApp', [
    // Angular modules 
    'ngResource',       // $resource for REST queries
    'ngRoute' ,          // routing
    'angularFileUpload','angulike'
    //'ngSanitize',
    //"com.2fdevs.videogular",
    //"com.2fdevs.videogular.plugins.controls",
    //"com.2fdevs.videogular.plugins.overlayplay",
    //"com.2fdevs.videogular.plugins.buffering",
    //"info.vietnamcode.nampnq.videogular.plugins.youtube"
    // Custom modules 

    // 3rd Party Modules
]);

// Execute bootstrapping code and any dependencies.
myApp.run(['$q', '$rootScope', ($q, $rootScope) => {
    $rootScope.facebookAppId = '[FacebookAppId]';
}]);

