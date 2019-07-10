var storage = window.localStorage;
// storage.removeItem() // Pass a key name to remove that key from storage.
// storage.setItem('key',val );
// storage.setItem('passlvl',16);
console.log(storage);
var d = new Date();
var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
 var toastHTML = '<span>Task successfuly deleted</span><button class="btn-flat toast-action">Undo</button>';
// ANGULAR
var app = angular.module("Routing", ["ngRoute", 'ngAnimate']);

app.controller('Main', function($scope) {
  var task_progress = 25;
  var task_color = 'red lighten-3';
  $scope.storage = storage;
  $scope.important = [{
      'im': 'Hight Priority',
      'cl': 'red',
      'sm': '!!!'
    },
    {
      'im': 'Medium Priority',
      'cl': 'yellow',
      'sm': '!!'
    },
    {
      'im': 'Low Priority',
      'cl': 'blue',
      'sm': '!'
    },
    {
      'im': 'No Priority',
      'cl': 'black',
      'sm': ''
    }
  ]
  $scope.select = (a) => {
    $scope.priority = a;
    $scope.num_task = a;
    console.log(a, 'Selected item');
    // $scope.check_if_have_small_tasks_storage()
  }

  function check_if_have_tasks_storage() {
    $scope.toDos = JSON.parse(storage.getItem('tasks'));
    if ($scope.toDos == null) {
      $scope.toDos = []
    }
    if (storage.getItem('tasks') == undefined || storage.getItem('tasks') == null || storage.getItem('tasks') == '[]' ||   $scope.toDos.length == 0) {
      $scope.toDos = [];
        $scope.no_tasks = true;
    }
    else {
      $scope.no_tasks = false;
        $scope.toDos = JSON.parse(storage.getItem('tasks'));
    }

  }
  check_if_have_tasks_storage()
// $scope.check_if_have_small_tasks_storage = (a)=>{
//   console.log($scope.num_task);
//   $scope.toDos = JSON.parse(storage.getItem('tasks'));
//   $scope.small_tasks = false
//   if ($scope.toDos.small_tasks == null || $scope.toDos.small_tasks == undefined) {
//       $scope.toDos = [];
//       $scope.small_tasks = false
//     }
//     if (storage.getItem('tasks') == undefined || storage.getItem('tasks') == null || storage.getItem('tasks') == '[]' ||   $scope.toDos.length == 0) {
//       $scope.toDos = [];
//         $scope.small_tasks = false;
//     }
//     else {
//       $scope.small_tasks = true;
//         $scope.toDos = JSON.parse(storage.getItem('tasks'));
//     }
//     console.log($scope.small_tasks);
// }
  // function check_if_have_small_tasks_storage() {
  //
  //
  //
  //   if (storage.getItem('tasks') == undefined || storage.getItem('tasks') == null || storage.getItem('tasks') == '[]' ||   $scope.toDos.length == 0) {
  //     $scope.toDos = [];
  //       $scope.no_tasks = true;
  //   }
  //   else {
  //     $scope.no_tasks = false;
  //       $scope.toDos = JSON.parse(storage.getItem('tasks'));
  //   }
  //
  // }

  $scope.setDef = (b)=>{
      $scope.editToDoTitle = $scope.toDos[b].title;
      $scope.editToDoDescription = $scope.toDos[b].description;
      $scope.editDueDate = $scope.toDos[b].dueBy;
  }

  $scope.editToDo = function(a) {
// $scope.editDueDate = Date.parse($scope.editattedDate);
    $scope.edit_task = a;

    $scope.$watch('editToDoTitle', ()=>{

      $scope.toDos[a].title = $scope.editToDoTitle;
    })
    $scope.$watch('editToDoDescription', ()=>{
      $scope.toDos[a].description = $scope.editToDoDescription;
    })
    $scope.$watch('editToDoTitle', ()=>{
      $scope.toDos[a].dueBy = $scope.editDueDate
    })

    refresh_stor($scope.toDos)
  check_if_have_tasks_storage()


  };

  $scope.addToDo = function() {
    var formattedDate = Date.parse($scope.formDueDate);
    $scope.toDos.push({
      title: $scope.formToDoTitle,
      description: $scope.formToDoDescription,
      dueBy: formattedDate,
        progress: 25,
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

    refresh_stor($scope.toDos)
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
     $('#todo, #desc').characterCounter();

     $scope.$watch('toDos',()=>{
       setTimeout(()=>{
         $('.dropdown-trigger').dropdown()
         $('#todo, #desc').characterCounter();
         
       },100)



     })

   });



});
