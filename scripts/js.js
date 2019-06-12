var storage = window.localStorage;
// storage.removeItem() // Pass a key name to remove that key from storage.
// storage.setItem('key',val );
// storage.setItem('passlvl',16);

var d = new Date();
var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// ANGULAR
var app = angular.module("Routing", ["ngRoute", 'ngAnimate']);


app.run(($rootScope) => {



})


app.controller('Main', function($scope) {
  $scope.toDos = [{
      'description': 'Wash the car',
      'dueBy': Date.now()
    },
    {
      'description': 'Try out Angular.js on CodePen',
      'dueBy': Date.now()
    }
  ];

  $scope.addToDo = function() {
    var formattedDate = Date.parse($scope.formDueDate);
    $scope.toDos.push({
      description: $scope.formToDo,
      dueBy: formattedDate
    });
    $scope.formToDo = '';
    $scope.formDueDate = '';
  };

  $scope.removeToDo = function(toDo) {
    var index = $scope.toDos.indexOf(toDo);
    $scope.toDos.splice(index, 1);
  };

});
