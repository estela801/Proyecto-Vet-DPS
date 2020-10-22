<?php 
  header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require("conexion.php");
$con = retornarConexion();
//Para ver si el usuario ya existe en la bd de mysql(mariadb)
$result = mysqli_query($con, "select correo_usuario from tb_usuario where correo_usuario='$_GET[correo]'");
$numero = mysqli_num_rows($result);

class Result { }
$respuesta = new Result();

if($numero == 0 ){
  //Si no esta en la base lo enviaremos a una configuracion basica
  $respuesta-> resultado = 'OK';
  $respuesta-> mensaje = '0';
}else if($numero == 1){
  //Si ya esta lo mantenemos en la pagina principal
  $respuesta-> resultado = 'OK';
  $respuesta-> mensaje = '1';
}else{
  //
  $respuesta-> resultado = 'NO';
  $respuesta-> mensaje = '2';
}

header('Content-Type: application/json');
echo json_encode($respuesta);

?>