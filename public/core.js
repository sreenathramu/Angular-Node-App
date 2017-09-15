var app = angular.module('searchApp', ['angucomplete']);

app.controller('searchController',function($scope, $http) {
    $scope.formData = {};
    // when landing on the page, get all todos and show them
    $http.get('/api/movies')
        .then(function(data) {
            $scope.movies = data;
            console.log(data);
        },
        function(data) {
            console.log('Error: ' + data);
        });

    $scope.selectedText = function() {
      alert('hi');
      $http.get('/api/moviesFilter?q='+$scope.selectedCountry)
          .then(function(data) {
              $scope.movies = data;
              console.log(data);
          },
          function(data) {
              console.log('Error: ' + data);
          });
    };
});
