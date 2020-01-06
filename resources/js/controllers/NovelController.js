import HttpdService from '../services/HttpdService';
import LoadingService from '../services/LoadingService';
import CONFIG from '../configs/dev';

(function () {
    'use strict';
    
    angular.module('app')
    .controller('NovelController', NovelController)
    .service('HttpdService', HttpdService)
    .service('LoadingService', LoadingService);
    
    function NovelController($scope, $q, $timeout, $window, $mdDialog, $filter, HttpdService, LoadingService) {
        var self = this;
        
        self.file = {
            url: undefined,
            name: 'untitled.txt',
        };
        self.novel = {};
        self.updateNovel = updateNovel;
        
        init();
        
        /*
         * Internal methods
         * --------------------------------------------------------- */
        function init() {
            __InitAsynchronous();
        }
        
        function __InitAsynchronous() {
            LoadingService.show();
            
            var promise1 = HttpdService.get(CONFIG.base_url + 'novel/content/' + novelCode + '/' + chapter);
            
            $q.all([promise1]).then(function (response) {
                console.info('<--$q.all.response-->');
                console.info(response);
                
                for (var i = 0; i < response.length; i++) {
                    if (response[i].data.success) {
                        self.novel = response[i].data.result;
    
                        var texts = '';
                        angular.forEach(self.novel, function(v, k) {
                            if(k === 'chapter') {
                                texts += v.th;
                                texts += "\r\n";
                            }
                            else if(k === 'contents') {
                                angular.forEach(v, function(c, i) {
                                    texts += c.th;
                                    texts += "\r\n";
                                });
                            }
                        });
                        var blob = new Blob([texts], {type: 'text/plain'});
                        var url = $window.URL || $window.webkitURL;
                        
                        self.file.url = url.createObjectURL(blob);
                        self.file.name = novelCode + '-' + chapter + '.txt';
                    }
                }
                
                LoadingService.hide();
            });
        }
        
        function updateNovel(novel) {
            LoadingService.show();
            
            HttpdService.put(CONFIG.base_url + 'novel/content/' + novelCode + '/' + chapter, novel)
            .then(function (response) {
                console.log('<--then(callback)-->');
                console.info(response);
                
                if (response.data.success) {
                    self.novel = response.data.result;
                }
            })
            .catch(function (response) {
                console.log('<--catch(callback)-->');
                console.info(response);
            })
            .finally(function () {
                console.log('<--finally(callback)-->');
                
                LoadingService.hide();
            });
        }
    }
})();
