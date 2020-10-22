<?php 
 header('Access-Control-Allow-Origin: *');
 header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
 header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
 header("Allow: GET, POST, OPTIONS, PUT, DELETE");


require("conexion.php");
$con = retornarConexion();
//Para ver si el usuario ya existe en la bd de mysql(mariadb)
$result = mysqli_query($con, "select id_mascota from tb_mascotas where registro_mascota='$_GET[mascota]'");
$numero = mysqli_num_rows($result);
$row = mysqli_fetch_array($result);
class Result { }
$respuesta = new Result();

if($numero == 0 ){
  $respuesta-> resultado = 'NO';
  $respuesta-> msg = '0';
}else if($numero == 1){

  $result2 = mysqli_query($con, "select id_mascota from tb_enlace where id_mascota='$row[id_mascota]'");
  $numero2 = mysqli_num_rows($result2);
  if($numero2 == 0){

    mysqli_query($con,"insert into tb_enlace(id_mascota, correo_usuario) values('$row[id_mascota]','$_GET[usuario]')");
    $respuesta->resultado = 'OK';
    $respuesta->msg = 'datos grabados';
  }else{
    $respuesta ->resultado = "Error";
    $respuesta ->msg = "NO";
  }
}

header('Content-Type: application/json');
echo json_encode($respuesta);

?>