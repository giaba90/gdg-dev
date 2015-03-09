<?php
// debug
ini_set("display_errors",1);
ini_set("display_startup_errors",1);
error_reporting(-1);
// require & include
require "Slim/Slim.php";
require "NotORM.php";
//include("config.php");
\Slim\Slim::registerAutoloader();
//connect to database
// $col = "mysql:host=$host;dbname=$db_name";
//$pdo = new PDO($col , "$db_user", "$db_psw");
$pdo = new PDO('sqlite:gdg_db.sqlite3');
$db  = new NotORM($pdo);
// create new Slim istance
$app = new \Slim\Slim();
//get all users (Participants of event)
$app->get("/users", function () use ($app, $db){
	$users = array();
	foreach ($db->partecipanti() as $user) {
		$users[] = array(
			"id" => $user["id"],
			"nome" => $user["nome"],
			"cognome" => $user["cognome"]
			);
	}
	$app->response()->header("Content-Type", "application/json");
    echo json_encode($users);
});
// get user by id
$app->get("/users/:id", function($id) use($app, $db){
	$app->response()->header("Content-Type", "application/json");
	$user = $db->partecipanti()->where("id", $id);
	if ($data = $user->fetch()) {
		  echo json_encode(array(
            "id" => $data["id"],
            "nome" => $data["nome"],
            "cognome" => $data["cognome"]
            ));
	} else {
		echo json_encode(array(
        	"status" => false,
        	"message" => "Non esiste un utente con questo ID"
            ));
	}
});
// get number of rows
$app->get("/count",function () use ($app, $db){
    $rows =(int) $db->partecipanti()->count("*");
    $app->response()->header("Content-Type", "application/json");
    echo json_encode(array("count" => $rows));
});
// add into database an user
$app->post("/users", function() use($app, $db){
    $user =  (array) json_decode($app->request()->getBody());
    $sql = array('nome' => $user['nome'] , 'cognome' => $user['cognome'] , 'email' => $user['email'] );
    $result = $db->partecipanti->insert($sql);
    if ($result["id"] != null) {
    	echo json_encode(array("id" => $result["id"]));
    } else {
    	echo json_encode(array(
        	"status" => false,
        	"message" => "Inserimento non riuscito"
            ));
    }
});
// run the Slim app
$app->run();