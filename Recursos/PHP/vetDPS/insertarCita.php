<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  
  require("conexion.php");
  $con=retornarConexion();
  
  class Result {}
  $response = new Result();

  //Estos minutos los sumare y restare para ver si el vet tendra tiempo suficiente para una cita   
  $minutosOpera=50;
  //Hora recibidad desde angular
  $horaRecibida = $params->hora;
  //$hora = "12:30";

  $segundosMinutosOpera = $minutosOpera*60;
  $segundosHoraRecibida = strtotime($horaRecibida);

  $horaResultado1 = date("H:i", $segundosHoraRecibida+$segundosMinutosOpera);
  $horaResultado2 = date("H:i", $segundosHoraRecibida-$segundosMinutosOpera);

  $verificando = mysqli_query($con, "select * from tb_citas where correo_vet='$params->correo_vet' and fecha='$params->fecha' and hora between '$horaResultado2' and '$horaResultado1'");
  $numeroCitas = mysqli_num_rows($verificando);
  if($numeroCitas > 0){
    $response->msg="1";
  }else {
      $existeMascota = mysqli_query($con, "select id_mascota from tb_mascotas where registro_mascota='$params->id_mascota'");
      $siExiste = mysqli_num_rows($existeMascota);
      if($siExiste == 1){
        $idMascota = mysqli_fetch_array($existeMascota);
        mysqli_query($con, "insert into tb_citas (id_mascota, correo_vet, descripcion, fecha, hora) values('$idMascota[id_mascota]','$params->correo_vet','$params->descripcion','$params->fecha','$params->hora')");
        $response->msg="OK";
      }else {
        $response->msg="2";
      }
  }
  header('Content-Type: application/json');
  echo json_encode($response);  
?>