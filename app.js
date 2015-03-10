// Code goes here
angular.module('gdgApp', ['ngResource'])
//service or factory
.factory('Users', function($resource) {
  return $resource('api.php/users/:id');
})
// controllers
.controller('MainCtrl', ['$scope', '$http', 'Users', '$window',
  function($scope, $http, Users, $window) {

    $scope.mostraReg = mostraDivReg;
    $scope.mostraUtenti = mostraDivUtenti;
    $scope.mostraVincitori = mostraDivVincitori;

    $scope.errors = "";
    $scope.msgs = "Utente inserito con id: ";

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

    function mostra() {
      $scope.users = Users.query();
    }

    function estrai() { 
      $http.get('api.php/randomusers').success(function(data){
        $scope.winner = data;
      });
    } 
  }
]);