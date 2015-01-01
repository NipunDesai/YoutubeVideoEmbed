/// <reference path="../../scripts/typings/angularjs/angular-route.d.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../app.ts" />

"use strict";
describe("videoControllerSpec", () => {
    var scope,
        $controllerConstructor: ng.IControllerService,
        log,
        sce,
        $qService,
        videoController,
        rootScope,
        defered;

    beforeEach(angular.mock.module("myApp"));

    beforeEach(inject(($controller: ng.IControllerService,
        $rootScope: ng.IRootScopeService,
        $log: ng.ILogService,
        $q: ng.IQService,
        $sce

        ) => {

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

    it("should Change video url", () => {
        var defered1 = $qService.defer();
        var url = "https://www.youtube.com/watch?v=X7WBmlK8GLo";
        scope.changeVideoUrl(url);
        defered1.resolve(url);

    });

    it("should be Null Video Url", () => {
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
