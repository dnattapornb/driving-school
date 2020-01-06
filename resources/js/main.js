require('angular');
require('angular-aria');
require('angular-animate');
require('angular-messages');
require('angular-resource');
require('angular-material');
require('angular-material-icons');
require('angular-material-data-table');

angular.module('app', ['ngMessages', 'ngResource', 'ngMaterial', 'ngMdIcons', 'md.data.table'])
// .config(ConfigThem)
.config(ConfigProgressCircular);

function ConfigThem($mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('orange');
}

function ConfigProgressCircular($mdProgressCircularProvider) {
    $mdProgressCircularProvider.configure({
        progressSize: 150,
        strokeWidth: 5,
        duration: 800,
    });
}
