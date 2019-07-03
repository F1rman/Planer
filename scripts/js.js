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
  var task_progress = 25;
  var task_color = 'red lighten-3';
  $scope.toDos = [{
      'title': 'Wash the car',
      'description':'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'dueBy': Date.now(),
      'progress' : task_progress,
      'color': task_color
    },
    {
      'title': 'Try out Angular.js on CodePen',
      'description':'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'dueBy': Date.now(),
      'progress' : task_progress+10,
      'color': 'blue'
    }
  ];
  console.log($scope.toDos);
    var todo = JSON.stringify($scope.toDos);
if (storage.getItem('tasks') == null) {
 $scope.toDos = JSON.parse(storage.getItem('tasks'))
}



  console.log(todo);
  // storage.setItem('tasks',todo);
  console.log(JSON.parse(storage.getItem('tasks')));

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
  document.addEventListener('DOMContentLoaded', function() {
     var elems = document.querySelectorAll('.modal');
     var instances = M.Modal.init(elems, options);
   });
   document.addEventListener('DOMContentLoaded', function() {
     var elems = document.querySelectorAll('.datepicker');
     var instances = M.Datepicker.init(elems, options);
   });
   // Or with jQuery

   $(document).ready(function(){
  M.AutoInit();
   });
});
