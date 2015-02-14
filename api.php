<?php

$data = json_decode(file_get_contents("php://input"));

include('config.php');
//collegamento
$col = "mysql:host=$host;dbname=$db_name";
try {
//tentativo di connessione
	$db = new PDO($col , "$db_user", "$db_psw");
}
 //gestione errori
catch(PDOException $e) {
	$arr = array('msg' => "", 'error' => $e->getMessage() );
    $jsn = json_encode($arr);
    print_r($jsn);
}

$nome = $data->nome;
$cognome = $data->cognome;
$email = $data->email;

$table="partecipanti"; //nome della tabella

$sql = "INSERT INTO $table (`nome`,`cognome`,`email`) VALUES (:nome,:cognome,:email)";
$stmt = $db->prepare($sql);
$stmt->execute(array(':nome'=>$nome,':cognome'=>$cognome,':email'=>$email));
$affected_rows = $stmt->rowCount();
if ($affected_rows > 0) {
	$arr = array('msg' => "User Created Successfully!!!", 'error' => '');
    $jsn = json_encode($arr);
    print_r($jsn);
} else {
	$arr = array('msg' => "", 'error' => 'Error In inserting record');
    $jsn = json_encode($arr);
    print_r($jsn);
}

#query per estrarre il numero totale degli utenti

#query per estrarre un utente in base all'id


?>