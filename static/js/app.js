(function(){
    angular.module('Fleapit', [''])
        .controller('myController', ['$scope', '$http',
									function($scope, $http) {
			$http.get('')
				.success(function(data, status, headers, config) {
				$scope.user = data;
				$scope.error = "";
			})
			.error(function(data, status, headers, config) {
				$scope.user = {};
				$scope.error = data;
			});
		}]);




}());