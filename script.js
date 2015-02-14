// Code goes here
angular.module('gdgApp',[])
  .controller('PartecipantiCtrl', ['$scope', function($scope){
   $scope.value=1;
   $scope.winner=[]; //array contenente il numero dei vincitori
   var numofwinner=3;//numero di vincitori ad ogni riffa
   $scope.estrai = function(){
     for(var i=0; i<numofwinner; i++){
       $scope.winner[i]=Math.floor(Math.random()*($scope.value+1));
     }
   };
  }])
  .controller('FrmCtrl', ['$scope','$http', function($scope, $http){
    $scope.errors = [];
    $scope.msgs = [];

    $scope.azione="registraUtente";

    $scope.registra = function() {

    $scope.errors.splice(0, $scope.errors.length); // remove all error messages
    $scope.msgs.splice(0, $scope.msgs.length);

    $http({
      method: 'POST',
      url: 'api.php',
      data: {
        'action': $scope.azione,
        'nome': $scope.username,
        'cognome': $scope.usercognome,
        'email': $scope.useremail
      },
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status, headers, config) {
        if (data.msg != '')
        {
            $scope.msgs.push(data.msg);
        }
        else
        {
            $scope.errors.push(data.error);
        }
    }).error(function(data, status,headers, config) { // called asynchronously if an error occurs
// or server returns response with an error status.
        $scope.errors.push(status);
    });
};

  }]);