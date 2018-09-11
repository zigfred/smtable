var smtableApp = angular.module('smtableApp', []);

smtableApp.controller("typeController", function ($scope) {
  $scope.typeMale = true;
  $scope.typeFemale = true;

  $scope.changeType = function() {
    console.log($scope.typeMale, $scope.typeFemale);
  }
});

smtableApp.controller("searchController", function ($scope) {
  $scope.searchText = this.searchText = "";
});


smtableApp.directive("smtable", function(dataProvider) {
  return function(scope, element, attrs) {
    dataProvider.getList(function(persons) {
      scope.persons = persons;
    });

    // sorting

  };
});

smtableApp.factory("dataProvider", ["$http", function($http) {
  return {
    getList: function(callback) {
      $http.get("list.json").then(function(response) {
        callback(response.data.persons);
      });
    }
  }
}]);

smtableApp.filter("ageFormatter", function() {
  return function(birthday) {
    var birthdayDate = new Date(+birthday);
    var now = new Date();

    return Math.abs(now.getUTCFullYear() - birthdayDate.getUTCFullYear());
  }
});
