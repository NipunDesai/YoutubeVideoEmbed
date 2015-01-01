/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-resource.d.ts" />
/// <reference path="../model/video.ts" />

var videoController = (function () {
    function videoController($scope, $sce, $upload) {
        var _this = this;
        this.$scope = $scope;
        this.$sce = $sce;
        this.$upload = $upload;
        $scope.changeVideoUrl = function (url) {
            return _this.changeVideoUrl(url);
        };
        $scope.onVideoUpload = function ($files) {
            return _this.onVideoUpload($files);
        };
        this.$scope.state = null;
        this.$scope.api = null;
        this.$scope.currentVideo = 0;
        this.$scope.currentTime = 0;
        this.$scope.totalTime = 0;

        this.$scope.volume = 1;
        this.$scope.isCompleted = false;
        this.$scope.onPlayerReady = function (api) {
            return _this.onPlayerReady(api);
        };
        this.$scope.onCompleteVideo = function () {
            return _this.onCompleteVideo();
        };
        this.$scope.onUpdateState = function (state) {
            return _this.onUpdateState(state);
        };
        this.$scope.onUpdateTime = function (currentTime, totalTime) {
            return _this.onUpdateTime(currentTime, totalTime);
        };
        this.$scope.onUpdateVolume = function (newVol) {
            return _this.onUpdateVolume(newVol);
        };
        this.$scope.fbshareData = [{ name: 'aaa' }, { name: 'bbb' }, { name: 'c' }];

        //    this.$scope.changeSource = () => this.changeSource();
        this.$scope.videos = [{
                sources: [
                    //{ src: "https://www.youtube.com/watch?v=gi-wl43o3gc" }
                    { src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov"), type: "video/mp4" }
                ]
            }];

        //{
        //        sources:[
        //            { src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov"), type: "video/mp4" }
        //    ]
        //}];
        //this.$scope.config = {
        //    preload: "none",
        //    autoHide: false,
        //    autoHideTime: 3000,
        //    autoPlay: false,
        //    sources: this.$scope.videos[0].sources,
        //    theme: {
        //        url: "http://www.videogular.com/styles/themes/default/videogular.css"
        //    },
        //    plugins: {
        //        poster: "http://www.videogular.com/assets/images/videogular.png"
        //    }
        //}
        this.$scope.config = {
            autoHide: false,
            autoHideTime: 3000,
            autoPlay: false,
            sources: $scope.videos[0].sources,
            tracks: $scope.videos[0].tracks,
            loop: false,
            preload: "auto",
            transclude: true,
            controls: undefined,
            theme: {
                url: "http://www.videogular.com/styles/themes/default/videogular.css"
            },
            plugins: {
                poster: {
                    url: "http://www.videogular.com/assets/images/videogular.png"
                },
                ads: {
                    companion: "companionAd",
                    companionSize: [728, 90],
                    network: "6062",
                    unitPath: "iab_vast_samples",
                    adTagUrl: "http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=%2F3510761%2FadRulesSampleTags&ciu_szs=160x600%2C300x250%2C728x90&cust_params=adrule%3Dpremidpostpodandbumpers&impl=s&gdfp_req=1&env=vp&ad_rule=1&vid=47570401&cmsid=481&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&correlator=[timestamp]",
                    skipButton: "<div class='skipButton'>skip ad</div>"
                }
            }
        };
        //this.$scope.config = {
        //    sources: [
        //        { src: this.$sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov"), type: "video/mp4" }
        //                   ],
        //    tracks: [
        //        {
        //            src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
        //            kind: "subtitles",
        //            srclang: "en",
        //            label: "English",
        //            default: ""
        //        }
        //    ],
        //    plugins: {
        //        poster: "http://www.videogular.com/assets/images/videogular.png"
        //    }
        //}
    }
    videoController.prototype.changeVideoUrl = function (url) {
        if (url == "") {
            this.$scope.displayVideoOrMessage = false;
        } else {
            this.$scope.displayVideoOrMessage = true;
            this.$scope.videoDisplay = false;
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                var s = 'http://www.youtube.com/embed/' + match[2];
                this.$scope.videoUrl = this.$sce.trustAsResourceUrl(s);
                this.$scope.videoDisplay = true;
                return s;
            } else {
                this.$scope.videoDisplay = false;
                this.$scope.errorMessage = "Invalid Url";
                return this.$scope.errorMessage;
            }
        }
    };

    videoController.prototype.onVideoUpload = function ($files) {
        var _this = this;
        var currentScope = this.$scope;

        //$files: an array of files selected, each file has name, size, and type.
        // currentScope.unsupportedFileFlag = false;
        var files = $files;
        var fileData = files[0];
        var fileName = files[0].name;

        //currentScope.videoContent.VideoContentGuId = fileName;
        var fileSplit = fileName.split('.');
        var fileExtension = fileSplit[1];
        var fileObj = new Model.Video();
        fileObj.VideoContentGuId = fileName;
        if (fileExtension == "wmv" || fileExtension == "avi" || fileExtension == "swf" || fileExtension == "flv" || fileExtension == "mp4") {
            this.$upload.upload({
                url: "api/Video/uploadVideo",
                method: "POST",
                data: { fileUploadObj: fileObj },
                file: fileData
            }).progress(function (evt) {
                // get upload percentage
                // console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function (data, status, headers, config) {
                // file is uploaded successfully
                currentScope.uploadVideoUrl = _this.$sce.trustAsResourceUrl(data.name);

                console.log(data);
            }).error(function (data, status, headers, config) {
                // file failed to upload
                console.log('Error In Upload Video');
            });
        } else {
            // currentScope.unsupportedFileFlag = true;
            //currentScope.unsupportedFileMsg = "Unsupported File Type";
        }
    };

    videoController.prototype.onPlayerReady = function (api) {
        this.$scope.api = api;

        if (this.$scope.api.currentState == 'play' || this.$scope.isCompleted)
            this.$scope.api.play();

        this.$scope.isCompleted = false;
    };

    videoController.prototype.onCompleteVideo = function () {
        this.$scope.isCompleted = true;

        this.$scope.currentVideo++;

        if (this.$scope.currentVideo >= this.$scope.videos.length)
            this.$scope.currentVideo = 0;

        this.setVideo(this.$scope.currentVideo);
    };

    videoController.prototype.setVideo = function (index) {
        this.$scope.api.stop();
        this.$scope.currentVideo = index;
        this.$scope.config.sources = this.$scope.videos[index].sources;
    };

    videoController.prototype.onUpdateState = function (state) {
        this.$scope.state = state;
    };

    videoController.prototype.onUpdateTime = function (currentTime, totalTime) {
        this.$scope.currentTime = currentTime;
        this.$scope.totalTime = totalTime;
    };

    videoController.prototype.onUpdateVolume = function (newVol) {
        this.$scope.volume = newVol;
    };

    videoController.prototype.changeSource = function () {
        this.$scope.config.sources = this.$scope.videos[1].sources;
        this.$scope.config.tracks = undefined;
        this.$scope.config.loop = false;
        this.$scope.config.preload = true;
    };
    videoController.controllerId = "videoController";
    return videoController;
})();

// Update the app1 variable name to be that of your module variable
//myApp.controller(videoController.controllerId, ['$scope', '$http', '$resource', '$sce', '$upload', ($scope, $http, $resource, $sce, $upload) => {
//    if (videoController.instance === undefined)
//        videoController.instance = new videoController($scope, $http, $resource, $sce, $upload);
//    return videoController.instance;
//}]);
myApp.controller(videoController.controllerId, [
    '$scope', '$sce', '$upload',
    function ($scope, $sce, $upload) {
        return new videoController($scope, $sce, $upload);
    }
]);
//# sourceMappingURL=videoController.js.map
