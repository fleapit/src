var app = angular.module('Fleapit', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, send to /index
    $urlRouterProvider.otherwise("/login");

    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "login.html",
            controller: "LoginCheckController"
        })
        .state('SuccessPage', {
            url: "/SuccessPage",
            templateUrl: "SuccessPage.html",
            controller: "LoginCheckController"
        });
});

app.controller('LoginCheckController', ['$scope', '$location', LoginCheckController]);

function LoginCheckController($scope, $location) {

    $scope.LoginCheck = function() {
        $location.path("SuccessPage");
    };

    $scope.go = function(path) {
        $location.path("/SuccessPage");
    };
}