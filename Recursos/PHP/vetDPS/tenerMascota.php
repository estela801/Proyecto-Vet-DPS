<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require("conexion.php");
$con = retornarConexion();
//Para ver si el usuario ya existe en la bd de mysql(mariadb)
$result = mysqli_query($con, "select correo_usuario from tb_enlace where correo_usuario='$_GET[correo]'");
$numero = mysqli_num_rows($result);

class Result { }
$respuesta = new Result();

if($numero == 0 ){
  //Si no esta en la base lo enviaremos a una configuracion basica
  $respuesta-> resultado = 'NO';
  $respuesta-> mascota = '0';
}else{
  //
  $respuesta-> resultado = 'OK';
  $respuesta-> mascota = '1';
}

header('Content-Type: application/json');
echo json_encode($respuesta);

?>