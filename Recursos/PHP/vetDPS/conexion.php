<?php

function retornarConexion() {
  $con=mysqli_connect("localhost","root","","vetdps");
  return $con;
}  
?>