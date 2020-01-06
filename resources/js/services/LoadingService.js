var LoadingService = function ($mdDialog) {
    var service = {
        hide: hide,
        show: show,
    };
    
    return service;
    
    /*
     * Internal methods
     */
    function hide() {
        setTimeout(function () {
            $mdDialog.hide();
            console.log('hide -> loading...');
        }, 5);
    }
    
    function show() {
        console.log('start -> loading...');
        $mdDialog.show({
            template: '' +
            '<md-dialog aria-label="loading" style="background-color:transparent; box-shadow:none;">' +
            '<div style="min-height: 200px; min-width: 200px">' +
            '<div layout="row" layout-sm="column" layout-align="center center" aria-label="loading">' +
            '<md-progress-circular md-mode="indeterminate" ></md-progress-circular>' +
            '</div>' +
            '</div>' +
            '</md-dialog>' +
            '',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            fullscreen: false,
        })
        .then(function (data) {
            console.log('then -> loading...');
            console.log('end -> loading...');
        })
        .catch(function () {
            console.log('catch -> loading...');
            console.log('end -> loading...');
        });
    }
};

export default LoadingService;