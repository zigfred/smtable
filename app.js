var smtableApp = angular.module('smtableApp', []);

smtableApp.controller("homePageController", ["$scope", "dataProvider", function ($scope, dataProvider) {

  $scope.toggleSexTypeSelection = function toggleSexTypeSelection(sexType) {
    if (_.includes($scope.selectedSexTypes, sexType)) {
      _.pull($scope.selectedSexTypes, sexType);
    } else {
      $scope.selectedSexTypes.push(sexType);
    }
  };


  dataProvider.getList(function(persons) {
    $scope.persons = persons;

    $scope.sexTypes = _.chain(persons).map("sex").uniq().value();
    $scope.selectedSexTypes = _.clone($scope.sexTypes);
  });

}]);


smtableApp.directive("smtable", function() {
  return function(scope, element, attrs) {

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

smtableApp.filter("sexFilter", function() {
  return function(list, selectedSexTypes) {

    return _.filter(list, function(item) {
      return _.includes(selectedSexTypes, item.sex);
    });

  }
});

smtableApp.filter('capitalizeFirstChar', function() {
  return function(input) {
    return _.upperFirst(input);
  }
});