<?php
header("Access-Control-Allow-Origin: http://localhost:4200 ");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
 header('Access-Control-Allow-methods:  GET, OPTIONS, PUT');
require "conexion.php" ;
$conexion=retornarConexion();
$jsonMascota = json_decode(file_get_contents("php://input"));
print_r($jsonMascota);

$nombre= mysqli_real_escape_string($conexion, trim($jsonMascota->nombre));
$registro= mysqli_real_escape_string($conexion, trim($jsonMascota->registro_mascota));
$edad= mysqli_real_escape_string($conexion, trim($jsonMascota->edad));
$sexo= mysqli_real_escape_string($conexion, trim($jsonMascota->sexo));
$tipo= mysqli_real_escape_string($conexion, trim($jsonMascota->tipo));
$raza= mysqli_real_escape_string($conexion, trim($jsonMascota->raza));

$consulta= "INSERT INTO `tb_mascotas` (`nombre`, `registro_mascota`,`edad`,`sexo`,`tipo`, `raza`) VALUES 
('{$nombre}','{$registro}','{$edad}','{$sexo}','{$tipo}','{$raza}')";
echo $consulta;

$resultado=mysqli_query($conexion,$consulta);






?>