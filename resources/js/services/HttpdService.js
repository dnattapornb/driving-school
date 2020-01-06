var HttpdService = function ($http, $q, $window, $interval, $timeout) {
    var service = {
        get: get,
        post: post,
        put: put,
    };
    
    return service;
    
    /*
     * Internal methods
     */
    function get(url) {
        if (angular.isUndefined(url) || url === null) {
            url = 'http://google.co.th';
        }
        
        var deferred = $q.defer();
        console.log('<--new(deferred)-->');
        console.info(deferred);
        
        deferred.notify('HttpdService : ' + url);
        console.log('<--notify(deferred)-->');
        console.info(deferred);
        
        $http({
            method: 'GET',
            async: true,
            url: url,
        }).then(function successCallback(response) {
            console.log('<--success-->');
            console.info(response);
            deferred.resolve(response);
            console.log('<--resolve(deferred)-->');
            console.info(deferred);
        }, function errorCallback(response) {
            console.log('<--error-->');
            console.info(response);
            deferred.reject(response);
            console.log('<--reject(deferred)-->');
            console.info(deferred);
        });
        
        return deferred.promise;
    }
    
    function post(url, data) {
        if (angular.isUndefined(url) || url === null) {
            url = 'http://google.co.th';
        }
        
        var deferred = $q.defer();
        console.log('<--new(deferred)-->');
        console.info(deferred);
        
        deferred.notify('HttpdService : ' + url);
        console.log('<--notify(deferred)-->');
        console.info(deferred);
        
        $http({
            method: 'POST',
            async: true,
            url: url,
            data: data,
        }).then(function successCallback(response) {
            console.log('<--success-->');
            console.info(response);
            deferred.resolve(response);
            console.log('<--resolve(deferred)-->');
            console.info(deferred);
        }, function errorCallback(response) {
            console.log('<--error-->');
            console.info(response);
            deferred.reject(response);
            console.log('<--reject(deferred)-->');
            console.info(deferred);
        });
        
        return deferred.promise;
    }
    
    function put(url, data) {
        if (angular.isUndefined(url) || url === null) {
            url = 'http://google.co.th';
        }
        
        var deferred = $q.defer();
        console.log('<--new(deferred)-->');
        console.info(deferred);
        
        deferred.notify('HttpdService : ' + url);
        console.log('<--notify(deferred)-->');
        console.info(deferred);
        
        $http({
            method: 'PUT',
            async: true,
            url: url,
            data: data,
        }).then(function successCallback(response) {
            console.log('<--success-->');
            console.info(response);
            deferred.resolve(response);
            console.log('<--resolve(deferred)-->');
            console.info(deferred);
        }, function errorCallback(response) {
            console.log('<--error-->');
            console.info(response);
            deferred.reject(response);
            console.log('<--reject(deferred)-->');
            console.info(deferred);
        });
        
        return deferred.promise;
    }
};

export default HttpdService;