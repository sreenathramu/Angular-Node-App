var app = angular.module('searchApp', ['angucomplete-alt']);

app.controller('searchController',function($scope, $http) {
    $scope.formData = {};
    $scope.movies = [];

    // when landing on the page, get all todos and show them
    $http.get('/api/movies')
        .then(function(data) {
            $scope.movies = data.data;
            $scope.searchData = data;
            console.log(data);
        },
        function(data) {
            console.log('Error: ' + data);
        });

    $scope.selectedText = function(str) {
      $http.get('/api/moviesFilter?q='+str)
          .then(function(data) {
              $scope.searchData = data;
              console.log(data);
          },
          function(data) {
              console.log('Error: ' + data);
          });
    };

    $scope.selectedMovie = function(selected) {
      $http.get('/api/moviesFilter?q='+selected.title)
          .then(function(data) {
              $scope.searchData = data;
              console.log(data);
          },
          function(data) {
              console.log('Error: ' + data);
          });
    };

});
