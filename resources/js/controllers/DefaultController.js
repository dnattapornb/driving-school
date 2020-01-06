import HttpdService from '../services/HttpdService';
import LoadingService from '../services/LoadingService';

(function () {
    'use strict';
    
    angular.module('app')
    .controller('DefaultController', DefaultController)
    .service('HttpdService', HttpdService)
    .service('LoadingService', LoadingService);
    
    function DefaultController($scope, $q, $timeout, $window, $mdDialog, $filter, HttpdService, LoadingService, Upload) {
        var self = this;
        
        /*
         * Internal methods
         * --------------------------------------------------------- */
        $scope.$watch('files', function () {
            $scope.upload($scope.files);
        });
        $scope.$watch('file', function () {
            if ($scope.file != null) {
                $scope.files = [$scope.file];
            }
        });
        $scope.log = '';
        $scope.fileUrl = undefined;
        $scope.fileName = 'file.txt';
        
        $scope.upload = function (files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    if (!file.$error) {
                        LoadingService.show();
                        Upload.upload({
                            url: 'upload',
                            data: {
                                file: file,
                            },
                        }).then(function (resp) {
                            $timeout(function () {
                                console.info(resp);
                                $scope.log = 'file: ' +
                                    resp.config.data.file.name +
                                    ', Response: ' + JSON.stringify(resp.data) +
                                    '\n' + $scope.log;
                                
                                if (resp.data.success) {
                                    var data = resp.data.result.content.string;
                                    var blob = new Blob([data], {type: 'text/plain'});
                                    var url = $window.URL || $window.webkitURL;
                                    
                                    $scope.fileUrl = url.createObjectURL(blob);
                                    $scope.fileName = resp.data.result.title + '.txt';
                                }
                            });
                            LoadingService.hide();
                        }, null, function (evt) {
                            var progressPercentage = parseInt(100.0 *
                                evt.loaded / evt.total);
                            $scope.log = 'progress: ' + progressPercentage +
                                '% ' + evt.config.data.file.name + '\n' +
                                $scope.log;
                            LoadingService.hide();
                        });
                    }
                }
            }
        };
        
        $scope.resetFileUrl = function () {
            $scope.fileUrl = undefined;
            $scope.fileName = 'file.txt';
        };
    }
})();
