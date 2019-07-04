var storage = window.localStorage;
// storage.removeItem() // Pass a key name to remove that key from storage.
// storage.setItem('key',val );
// storage.setItem('passlvl',16);

var d = new Date();
var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// ANGULAR
var app = angular.module("Routing", ["ngRoute", 'ngAnimate']);

app.controller('Main', function($scope) {
  var task_progress = 25;
  var task_color = 'red lighten-3';
      $scope.toDos = JSON.parse(storage.getItem('tasks'));
      console.log($scope.toDos);
  function check_if_have_tasks_storage() {
      $scope.toDos = JSON.parse(storage.getItem('tasks'));
      console.log($scope.toDos);
    if (storage.getItem('tasks') == undefined || storage.getItem('tasks') == null || storage.getItem('tasks') == '[]') {
      $scope.no_tasks = true;
    }
  }
  check_if_have_tasks_storage()

  $scope.addToDo = function() {
    var formattedDate = Date.parse($scope.formDueDate);
    $scope.toDos.push({
      title: $scope.formToDoTitle,
      description: $scope.formToDoDescription,
      dueBy: formattedDate,
    });
    refresh_stor(($scope.toDos))
    check_if_have_tasks_storage()
    $scope.formToDoTitle = '';
    $scope.formToDoDescription = '';
    $scope.formDueDate = '';
  };

  $scope.removeToDo = function(toDo) {
    var index = $scope.toDos.indexOf(toDo);
    $scope.toDos.splice(index, 1);
    refresh_stor($scope.toDos)
    check_if_have_tasks_storage()
  };
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
  });
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, options);
  });
  // Or with jQuery


  function refresh_stor(a) {
    storage.setItem('tasks', JSON.stringify(a));
  }
  $(document).ready(function() {
    M.AutoInit();
  });
});
