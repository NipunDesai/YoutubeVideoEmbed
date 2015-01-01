/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/typings/angularjs/angular-resource.d.ts" />

// Create the module and define its dependencies.
var myApp = angular.module('myApp', [
    'ngResource',
    'ngRoute',
    'angularFileUpload', 'angulike'
]);

// Execute bootstrapping code and any dependencies.
myApp.run([
    '$q', '$rootScope', function ($q, $rootScope) {
        $rootScope.facebookAppId = '[FacebookAppId]';
    }]);
//# sourceMappingURL=app.js.map
