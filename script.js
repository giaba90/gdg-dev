// Code goes here
angular.module('gdgApp',['ngResource'])
//service or factory
.factory('Users', function($resource) {
  return $resource('index.php/users/:id');
})
// controllers
  .controller('PartecipantiCtrl', ['$scope','$http','Users', function($scope, $http, Users){
    var participants; //contiene il numero di partecipanti
    var numofwinner = 3; //numero di vincitori ad ogni riffa
    $scope.winner = []; //array contenente il numero dei vincitori
    $scope.estrai = estrai;
    $scope.mostra = mostra;

    count();

    function count(){
      $http.get('index.php/count').success(function(data){
        participants = data.count;
      });
   };
   function estrai(){
     for(var i=0; i<numofwinner; i++){
      $scope.userID = Math.floor(Math.random()*(participants)+1);
      $scope.winner[i] = Users.get({id : $scope.userID});
     }
   };
  function mostra(){
    $scope.users = Users.query();
  }
  }])
  .controller('FrmCtrl', ['$scope','$http','Users', function($scope, $http,Users){
    $scope.errors = [];
    $scope.msgs = [];

    $scope.utente = new Users();
    $scope.addUtente = function(){
      $scope.errors.splice(0, $scope.errors.length); // remove all error messages
      $scope.msgs.splice(0, $scope.msgs.length);

      $scope.utente.$save(function(data){
        if (data.status != false){
            $scope.msgs.push(data.id); }
        else{
            $scope.errors.push(data.message);}
      });
    };

  }]);