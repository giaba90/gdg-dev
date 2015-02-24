// Code goes here
angular.module('gdgApp', ['ngResource'])
//service or factory
.factory('Users', function($resource) {
  return $resource('index.php/users/:id');
})
// controllers
.controller('MainCtrl', ['$scope', '$http', 'Users', '$window',
  function($scope, $http, Users, $window) {
    var participants; //contiene il numero di partecipanti
    var numofwinner = 3; //numero di vincitori ad ogni riffa
    $scope.winner = []; //array contenente il numero dei vincitori

    $scope.mostraReg = mostraDivReg;
    $scope.mostraUtenti = mostraDivUtenti;
    $scope.mostraVincitori = mostraDivVincitori;

    $scope.errors = "";
    $scope.msgs = "Utente inserito con id: ";


    count();

    $scope.utente = new Users();
    $scope.addUser = function() {
      $scope.utente.$save(function(data) {
        if (data.status != false) {
          $window.alert($scope.msgs + data.id);
        } else {
          $scope.errors = data.message;
          $window.alert($scope.errors);
        }
      });
    }

    function mostraDivReg() {
      $scope.showForm = true;
      $scope.showUser = false;
      $scope.showWinner = false;
    }

    function mostraDivUtenti() {
      $scope.showForm = false;
      $scope.showUser = true;
      $scope.showWinner = false;

      mostra();
    }

    function mostraDivVincitori() {
      $scope.showForm = false;
      $scope.showUser = false;
      $scope.showWinner = true;

      estrai();
    }

    function count() {
      $http.get('index.php/count').success(function(data) {
        participants = data.count;
      });
    }

    function mostra() {
      $scope.users = Users.query();
    }

    function estrai() {
      for (var i = 0; i < numofwinner; i++) {
        $scope.userID = Math.floor(Math.random() * (participants) + 1);
        $scope.winner[i] = Users.get({
          id: $scope.userID
        });
      }
    }
  }
]);