<?php
header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$jsonMascota = json_decode(file_get_contents("php://input"));

require("conexion.php");
$conexion=retornarConexion();

mysqli_query($conexion,"insert into tb_mascotas(nombre,registro_mascota,edad,tipo, raza,sexo)
 values ('$jsonMascota->nombre', '$jsonMascota->registro_mascota', '$jsonMascota->edad', '$jsonMascota->tipo', '$jsonMascota->raza', '$jsonMascota->sexo')");

 class Result {}

 $response = new Result();
 $response->resultado = 'OK';
 $response->mensaje = 'datos grabados';

 header('Content-Type: application/json');
 echo json_encode($response);  

?>