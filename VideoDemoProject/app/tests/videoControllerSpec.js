/// <reference path="../../scripts/typings/angularjs/angular-route.d.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../app.ts" />
"use strict";
describe("videoControllerSpec", function () {
    var scope, $controllerConstructor, log, sce, $qService, videoController, rootScope, defered;

    beforeEach(angular.mock.module("myApp"));

    beforeEach(inject(function ($controller, $rootScope, $log, $q, $sce) {
        $controllerConstructor = $controller;
        scope = $rootScope.$new(true);
        log = $log;
        sce = $sce;
        $qService = $q;
        rootScope = $rootScope;

        initialize();
    }));

    //afterEach(() => {
    //    notepadController.Instance = undefined;
    //});
    it("should Change video url", function () {
        var defered1 = $qService.defer();
        var url = "https://www.youtube.com/watch?v=X7WBmlK8GLo";
        scope.changeVideoUrl(url);
        defered1.resolve(url);
    });

    it("should be Null Video Url", function () {
        var deferd1 = $qService.defer();
        var url = "sds";
        scope.changeVideoUrl(url);
        deferd1.resolve(url);
    });

    function initialize() {
        videoController = $controllerConstructor("videoController", {
            $scope: scope,
            $log: log,
            $sce: sce,
            $rootScope: rootScope
        });
    }
});
//# sourceMappingURL=videoControllerSpec.js.map
