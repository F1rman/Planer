var storage = window.localStorage;
// storage.removeItem() // Pass a key name to remove that key from storage.
// storage.setItem('key',val );
// storage.setItem('passlvl',16);
console.log(storage);
var d = new Date();
var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// ANGULAR
var app = angular.module("Routing", ["ngRoute", 'ngAnimate']);

app.controller('Main', function($scope) {
  var task_progress = 25;
  var task_color = 'red lighten-3';
  $scope.important = [{
      'im': 'very hight',
      'cl': 'red'
    },
    {
      'im': 'hight',
      'cl': 'yellow'
    },
    {
      'im': 'medium',
      'cl': 'blue'
    },
    {
      'im': 'low',
      'cl': 'black'
    }
  ]
  $scope.select = (a) => {
    $scope.priority = a;
    $scope.num_task = a;
    console.log($scope.toDos[$scope.num_task]);
  }

  function check_if_have_tasks_storage() {
    $scope.toDos = JSON.parse(storage.getItem('tasks'));
    console.log($scope.toDos.length);
      $scope.toDos.length == 0?  $scope.no_tasks = true: $scope.no_tasks = false;
console.log($scope.toDos.length);
    if (storage.getItem('tasks') == undefined || storage.getItem('tasks') == null || storage.getItem('tasks') == '[]' ) {
      $scope.toDos = [];
        $scope.no_tasks = true;
    }
    else {
      return   $scope.toDos = JSON.parse(storage.getItem('tasks'));
    }

    console.log($scope.toDos.length);
  }
  check_if_have_tasks_storage()


  $scope.addToDo = function() {
    var formattedDate = Date.parse($scope.formDueDate);
    $scope.toDos.push({
      title: $scope.formToDoTitle,
      description: $scope.formToDoDescription,
      dueBy: formattedDate,
      important: $scope.priority
    });
    refresh_stor($scope.toDos)
  check_if_have_tasks_storage()
    $scope.formToDoTitle = '';
    $scope.formToDoDescription = '';
    $scope.formDueDate = '';

  };

  function check_smaller_task() {
    check_if_have_tasks_storage()
    var sm_tasks = JSON.parse(storage.getItem('tasks'))[$scope.num_task].smaller_tasks
    if (sm_tasks == undefined || sm_tasks == null || sm_tasks == '[]') {
      $scope.toDos[$scope.num_task].smaller_tasks = []
      $scope.no_smaller_tasks = true;
      console.log(sm_tasks == undefined || sm_tasks == null || sm_tasks == '[]');
    } else {
      sm_tasks = JSON.parse(storage.getItem('tasks'))[$scope.num_task].smaller_tasks
    }
  }

  // console.log(sm_tasks);
  $scope.addToTasks = function() {
    check_smaller_task()
console.log(  $scope.toDos[$scope.num_task].smaller_tasks);
    var formDueDate_s = Date.parse($scope.formDueDate_s);
    $scope.toDos[$scope.num_task].smaller_tasks.push({
      title_s: $scope.formToDoTitle_s,
      description_s: $scope.formToDoDescription_s,
      dueBy_s: formDueDate_s,
    });

    refresh_stor(($scope.toDos))
    $scope.title_s = '';
    $scope.description_s = '';
    $scope.dueBy_s = '';
  };

  $scope.removeToDo = function(toDo) {
    var index = $scope.toDos.indexOf(toDo);
    $scope.toDos.splice(index, 1);
    refresh_stor($scope.toDos)
    check_if_have_tasks_storage()
  };

  function refresh_stor(a) {
    storage.setItem('tasks', JSON.stringify(a));
  }
  $(document).ready(function() {
    M.AutoInit();
    $('.fixed-action-btn').floatingActionButton({
      toolbarEnabled: true
    });
    $scope.$watch('toDos',()=>{
      console.log('toDos');
      setTimeout(()=>{
        M.AutoInit();
        $('.fixed-action-btn').floatingActionButton({
          toolbarEnabled: true
        });
      },20)

    })

  });
});
