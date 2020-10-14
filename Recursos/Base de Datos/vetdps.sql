-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-10-2020 a las 09:57:29
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `vetdps`
--
CREATE DATABASE IF NOT EXISTS `vetdps` ;
USE `vetdps`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_citas`
--

CREATE TABLE `tb_citas` (
  `id_citas` int(11) NOT NULL,
  `id_mascota` int(11) NOT NULL,
  `correo_vet` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_cuadroclinico`
--

CREATE TABLE `tb_cuadroclinico` (
  `id_diagnostico` int(11) NOT NULL,
  `id_cita` int(11) NOT NULL,
  `Observacion` text NOT NULL,
  `id_receta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_factura`
--

CREATE TABLE `tb_factura` (
  `id_factura` int(11) NOT NULL,
  `id_cita` int(11) NOT NULL,
  `id_receta` int(11) NOT NULL,
  `total` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_mascotas`
--

CREATE TABLE `tb_mascotas` (
  `id_mascota` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `edad` int(3) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `raza` varchar(50) NOT NULL,
  `correo_encargado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_receta`
--

CREATE TABLE `tb_receta` (
  `id_receta` int(11) NOT NULL,
  `Descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_usuario`
--

CREATE TABLE `tb_usuario` (
  `correo_usuario` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `fechaNac` varchar(9) NOT NULL,
  `telefono` varchar(9) NOT NULL,
  `tipo` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tb_citas`
--
ALTER TABLE `tb_citas`
  ADD PRIMARY KEY (`id_citas`),
  ADD KEY `cita_mascota` (`id_mascota`),
  ADD KEY `cita_vet` (`correo_vet`);

--
-- Indices de la tabla `tb_cuadroclinico`
--
ALTER TABLE `tb_cuadroclinico`
  ADD PRIMARY KEY (`id_diagnostico`),
  ADD KEY `cuadroClinico_cita` (`id_cita`),
  ADD KEY `cuadroClinico_receta` (`id_receta`);

--
-- Indices de la tabla `tb_factura`
--
ALTER TABLE `tb_factura`
  ADD PRIMARY KEY (`id_factura`),
  ADD KEY `factura_cita` (`id_cita`),
  ADD KEY `recte_factura` (`id_receta`);

--
-- Indices de la tabla `tb_mascotas`
--
ALTER TABLE `tb_mascotas`
  ADD PRIMARY KEY (`id_mascota`),
  ADD KEY `mascota_cliente` (`correo_encargado`);

--
-- Indices de la tabla `tb_receta`
--
ALTER TABLE `tb_receta`
  ADD PRIMARY KEY (`id_receta`);

--
-- Indices de la tabla `tb_usuario`
--
ALTER TABLE `tb_usuario`
  ADD PRIMARY KEY (`correo_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tb_citas`
--
ALTER TABLE `tb_citas`
  MODIFY `id_citas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_cuadroclinico`
--
ALTER TABLE `tb_cuadroclinico`
  MODIFY `id_diagnostico` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_factura`
--
ALTER TABLE `tb_factura`
  MODIFY `id_factura` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_mascotas`
--
ALTER TABLE `tb_mascotas`
  MODIFY `id_mascota` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_receta`
--
ALTER TABLE `tb_receta`
  MODIFY `id_receta` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tb_citas`
--
ALTER TABLE `tb_citas`
  ADD CONSTRAINT `tb_citas_ibfk_1` FOREIGN KEY (`id_mascota`) REFERENCES `tb_mascotas` (`id_mascota`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_citas_ibfk_2` FOREIGN KEY (`correo_vet`) REFERENCES `tb_usuario` (`correo_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tb_cuadroclinico`
--
ALTER TABLE `tb_cuadroclinico`
  ADD CONSTRAINT `tb_cuadroclinico_ibfk_1` FOREIGN KEY (`id_cita`) REFERENCES `tb_citas` (`id_citas`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_cuadroclinico_ibfk_2` FOREIGN KEY (`id_receta`) REFERENCES `tb_receta` (`id_receta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tb_factura`
--
ALTER TABLE `tb_factura`
  ADD CONSTRAINT `tb_factura_ibfk_1` FOREIGN KEY (`id_cita`) REFERENCES `tb_citas` (`id_citas`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_factura_ibfk_2` FOREIGN KEY (`id_receta`) REFERENCES `tb_receta` (`id_receta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tb_mascotas`
--
ALTER TABLE `tb_mascotas`
  ADD CONSTRAINT `tb_mascotas_ibfk_1` FOREIGN KEY (`correo_encargado`) REFERENCES `tb_usuario` (`correo_usuario`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
