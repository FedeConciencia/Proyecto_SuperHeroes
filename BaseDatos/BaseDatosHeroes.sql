-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: heroes
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `heroe`
--

DROP TABLE IF EXISTS `heroe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `heroe` (
  `idHeroe` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `bio` varchar(300) NOT NULL,
  `img` varchar(45) NOT NULL,
  `aparicion` date NOT NULL,
  `casa` varchar(45) NOT NULL,
  `escalaPoder` int NOT NULL,
  `fechaAlta` date NOT NULL,
  `fechaBaja` date NOT NULL,
  `estado` varchar(45) NOT NULL,
  PRIMARY KEY (`idHeroe`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `heroe`
--

LOCK TABLES `heroe` WRITE;
/*!40000 ALTER TABLE `heroe` DISABLE KEYS */;
INSERT INTO `heroe` VALUES (1,'Aquaman','El poder más reconocido de Aquaman es la capacidad telepática para comunicarse con la vida marina','aquaman.jpg','1941-11-01','DC',7,'2022-07-15','1900-01-01','activo'),(2,'Batman','Los rasgos principales de Batman se resumen en destreza física, habilidades deductivas y obsesión','batman.jpg','1939-05-01','DC',8,'2022-07-15','1900-01-01','activo'),(3,'Daredevil','l haber perdido la vista, los cuatro sentidos restantes de Daredevil fueron aumentados por la radiación a niveles superhumanos','daredevil.jpg','1964-01-01','Marvel',6,'2022-07-15','1900-01-01','activo'),(4,'Hulk','Su principal poder es su capacidad de aumentar su fuerza hasta niveles prácticamente ilimitados','hulk.jpg','1962-01-01','Marvel',8,'2022-07-15','1900-01-01','activo'),(5,'Linterna Verde','Poseedor del anillo de poder que posee la capacidad de crear manifestaciones de luz sólida mediante la utilización del pensamiento','lverde.jpg','1966-01-01','DC',9,'2022-07-15','1900-01-01','activo'),(6,'Spider-Man','ras ser mordido por una araña radiactiva, obtuvo los siguientes poderes sobrehumanos, una gran fuerza, agilidad, poder trepar por paredes','spider.jpg','1962-08-01','Marvel',7,'2022-07-15','1900-01-01','activo'),(7,'Wolverine','Wolverine posee poderes regenerativos que pueden curar cualquier herida, por mortal que ésta sea, además ese mismo poder hace que sea inmune a cualquier enfermedad existente en la Tierra y algunas extraterrestres','wolverine.jpg','1974-11-01','Marvel',9,'2022-07-15','1900-01-01','activo'),(8,'Superman','uperman nació en el planeta Krypton y recibió el nombre de Kal-El al nacer','superman.jpg','1938-04-18','DC',10,'2022-07-15','1900-01-01','activo'),(9,'Flash','Apodado el Corredor Escarlata, todas las encarnaciones del Flash poseen súper velocidad','flash.jpg','1954-02-09','DC',7,'2022-07-15','1900-01-01','activo');
/*!40000 ALTER TABLE `heroe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poderes`
--

DROP TABLE IF EXISTS `poderes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poderes` (
  `idPoderes` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `fechaAlta` date NOT NULL,
  `fechaBaja` date NOT NULL,
  `estado` varchar(45) NOT NULL,
  PRIMARY KEY (`idPoderes`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poderes`
--

LOCK TABLES `poderes` WRITE;
/*!40000 ALTER TABLE `poderes` DISABLE KEYS */;
INSERT INTO `poderes` VALUES (1,'Superfuerza','2022-07-15','1900-01-01','activo'),(2,'Control de criaturas marinas','2022-07-15','1900-01-01','activo'),(3,'Respira bajo el agua','2022-07-15','1900-01-01','activo'),(4,'Super Traje','2022-07-15','1900-01-01','activo'),(5,'Millonario','2022-07-15','1900-01-01','activo'),(6,'Inteligencia','2022-07-15','1900-01-01','activo'),(7,'Agilidad','2022-07-15','1900-01-01','activo'),(8,'Velocidad','2022-07-15','1900-01-01','activo'),(9,'Hipersentidos','2022-07-15','1900-01-01','activo'),(10,'Resistencia','2022-07-15','1900-01-01','activo'),(11,'Inmunidad','2022-07-15','1900-01-01','activo'),(12,'Puede Volar','2022-07-15','1900-01-01','activo'),(13,'Anillo con Poderes','2022-07-15','1900-01-01','activo'),(14,'Sentido Arácnido','2022-07-15','1900-01-01','activo'),(15,'Regeneracion','2022-07-15','1900-01-01','activo'),(17,'Esqueleto y Garras de Adamantium','2022-07-15','1900-01-01','activo'),(19,'Congelación','2022-07-15','1900-01-01','activo'),(20,'Hipervelocidad','2022-07-15','1900-01-01','activo'),(21,'SuperVelocidad','2022-07-15','1900-01-01','activo'),(22,'Puede Viajar en el tiempo','2022-07-15','1900-01-01','activo');
/*!40000 ALTER TABLE `poderes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `union_heroe_poderes`
--

DROP TABLE IF EXISTS `union_heroe_poderes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `union_heroe_poderes` (
  `idUnion` int NOT NULL AUTO_INCREMENT,
  `idHeroe` int NOT NULL,
  `idPoderes` int NOT NULL,
  `fechaAlta` date NOT NULL,
  `fechaBaja` date NOT NULL,
  `estado` varchar(45) NOT NULL,
  PRIMARY KEY (`idUnion`),
  KEY `heroe_fk_idx` (`idHeroe`),
  KEY `poderes_fk_idx` (`idPoderes`),
  CONSTRAINT `heroe_fk` FOREIGN KEY (`idHeroe`) REFERENCES `heroe` (`idHeroe`),
  CONSTRAINT `poderes_fk` FOREIGN KEY (`idPoderes`) REFERENCES `poderes` (`idPoderes`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `union_heroe_poderes`
--

LOCK TABLES `union_heroe_poderes` WRITE;
/*!40000 ALTER TABLE `union_heroe_poderes` DISABLE KEYS */;
INSERT INTO `union_heroe_poderes` VALUES (1,1,1,'2022-07-15','1900-01-01','activo'),(2,1,2,'2022-07-15','1900-01-01','activo'),(3,1,3,'2022-07-15','1900-01-01','activo'),(4,2,4,'2022-07-15','1900-01-01','activo'),(5,2,5,'2022-07-15','1900-01-01','activo'),(6,2,6,'2022-07-15','1900-01-01','activo'),(7,3,7,'2022-07-15','1900-01-01','activo'),(8,3,8,'2022-07-15','1900-01-01','activo'),(9,3,9,'2022-07-15','1900-01-01','activo'),(10,4,1,'2022-07-15','1900-01-01','activo'),(11,4,10,'2022-07-15','1900-01-01','activo'),(12,4,11,'2022-07-15','1900-01-01','activo'),(13,5,12,'2022-07-15','1900-01-01','activo'),(14,5,13,'2022-07-15','1900-01-01','activo'),(15,5,10,'2022-07-15','1900-01-01','activo'),(16,6,14,'2022-07-15','1900-01-01','activo'),(17,6,1,'2022-07-15','1900-01-01','activo'),(18,6,7,'2022-07-15','1900-01-01','activo'),(19,7,15,'2022-07-15','1900-01-01','activo'),(20,7,11,'2022-07-15','1900-01-01','activo'),(21,7,17,'2022-07-15','1900-01-01','activo'),(22,8,1,'2022-07-15','1900-01-01','activo'),(23,8,11,'2022-07-15','1900-01-01','activo'),(24,8,12,'2022-07-15','1900-01-01','activo'),(25,8,19,'2022-07-15','1900-01-01','activo'),(26,8,20,'2022-07-15','1900-01-01','activo'),(27,9,1,'2022-07-15','1900-01-01','activo'),(28,9,21,'2022-07-15','1900-01-01','activo'),(29,9,22,'2022-07-15','1900-01-01','activo');
/*!40000 ALTER TABLE `union_heroe_poderes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-15 18:58:08
