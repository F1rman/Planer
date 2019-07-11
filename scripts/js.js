var storage = window.localStorage;
// storage.removeItem() // Pass a key name to remove that key from storage.
// storage.setItem('key',val );
// storage.setItem('passlvl',16);
console.log(storage);
var d = new Date();
// ANGULAR
var app = angular.module("Routing", ["ngRoute", 'ngAnimate']);

app.controller('Main', function($scope) {
  var task_progress = 25;
  var del_task_timer;
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
    $scope.num_task = a;
    $scope.priority = a;
    console.log(a, 'Selected item');
    $scope.editToDoTitle = $scope.toDos[a].title;
    $scope.editToDoDescription = $scope.toDos[a].description;
    $scope.editattedDate = $scope.toDos[a].dueByDate;
    $scope.editformDueTime = $scope.toDos[a].dueByTime;
    $('#important_edit').value = $scope.toDos[a].important;
  }

  function check_if_have_tasks_storage() {
    $scope.toDos = JSON.parse(storage.getItem('tasks'));
    if ($scope.toDos == null) {
      $scope.toDos = []
    }
    if (storage.getItem('tasks') == undefined || storage.getItem('tasks') == null || storage.getItem('tasks') == '[]' || $scope.toDos.length == 0) {
      $scope.toDos = [];
      $scope.no_tasks = true;
    } else {
      $scope.no_tasks = false;
      $scope.toDos = JSON.parse(storage.getItem('tasks'));
    }

  }
  check_if_have_tasks_storage()


  $scope.changeTodo = (a) => {
    $scope.toDos[a].title = $scope.editToDoTitle;
    $scope.toDos[a].description = $scope.editToDoDescription;
    $scope.toDos[a].dueByDate = $scope.editattedDate;
    $scope.toDos[a].dueByTime = $scope.editformDueTime;
    $scope.toDos[a].important = $('#important_edit').val();
    refresh_stor($scope.toDos)
    check_if_have_tasks_storage()
    M.toast({html: 'Task successfuly changed'})
  }

  $scope.addToDo = function() {
    if ($scope.formToDoTitle == undefined || $scope.formToDoTitle == null || $scope.formToDoTitle == '') {
      $scope.formToDoTitle = "Default title"
    }
    $scope.toDos.push({
      title: $scope.formToDoTitle,
      description: $scope.formToDoDescription,
      dueByDate: $scope.formDueDate,
      dueByTime: $scope.formDueTime,
      progress: 25,
      important: $('#important').val()
    });


    refresh_stor($scope.toDos)
    check_if_have_tasks_storage()
    $scope.formToDoTitle = '';
    $scope.formToDoDescription = '';
    $scope.formDueDate = '';
    $scope.formDueTime = '';
    M.toast({html: 'Task successfuly created'})

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
  $scope.addSmallTasks = function() {
    check_smaller_task()
    console.log($scope.toDos[$scope.num_task].smaller_tasks);
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
    $('.li' + $scope.toDos.indexOf(toDo)).slideUp();
    del_task_timer = setTimeout(() => {
      var index = $scope.toDos.indexOf(toDo);
      $scope.toDos.splice(index, 1);
      refresh_stor($scope.toDos)
      check_if_have_tasks_storage()
    }, 5000)
    console.log($scope.toDos.indexOf(toDo));
    var toastHTML = '<span>Task successfuly deleted</span><button id="undo" class="btn-flat toast-action">Undo</button>';
    M.toast({
      html: toastHTML,
      displayLength: 5000
    });
    $("body").on('click', '#undo', function() {
      $(this).addClass("undo");
      var toastElement = document.querySelector('.toast');
      var toastInstance = M.Toast.getInstance(toastElement);
      clearTimeout(del_task_timer);
      $('.li' + $scope.toDos.indexOf(toDo)).slideDown();
      console.log(del_task_timer);
      //undofunction();

    });
  };

  function refresh_stor(a) {
    storage.setItem('tasks', JSON.stringify(a));
  }

  $(document).ready(function() {

    $('#del').click(() => {
      console.log("UNDO CLICKED")
      $('#del').remove();
    })

    M.AutoInit();
    $('#todo, #desc').characterCounter();
    $('.timepicker').timepicker({
      'twelveHour': false
    });
    $('.datepicker').datepicker({
      'minDate': d
    });
    $scope.$watch('toDos', () => {
      setTimeout(() => {
        $('.dropdown-trigger').dropdown()
        $('#todo, #desc').characterCounter();
        $('.timepicker').timepicker({
          'twelveHour': false
        });
        $('.datepicker').datepicker({
          'minDate': d
        });

      }, 100)



    })

  });



});
