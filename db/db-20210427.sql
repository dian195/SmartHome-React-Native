CREATE DATABASE  IF NOT EXISTS `smarthome_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `smarthome_db`;
-- MySQL dump 10.13  Distrib 8.0.12, for Win64 (x86_64)
--
-- Host: 207.148.121.237    Database: smarthome_db
-- ------------------------------------------------------
-- Server version	8.0.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `mst_biayalistrik`
--

DROP TABLE IF EXISTS `mst_biayalistrik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `mst_biayalistrik` (
  `ID` int NOT NULL,
  `Nominal` decimal(20,2) DEFAULT '0.00',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mst_biayalistrik`
--

LOCK TABLES `mst_biayalistrik` WRITE;
/*!40000 ALTER TABLE `mst_biayalistrik` DISABLE KEYS */;
INSERT INTO `mst_biayalistrik` VALUES (1,1467.26);
/*!40000 ALTER TABLE `mst_biayalistrik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mst_lampu`
--

DROP TABLE IF EXISTS `mst_lampu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `mst_lampu` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Lampu_Name` varchar(100) NOT NULL,
  `Is_Active` int DEFAULT '0',
  `Watt` decimal(2,0) DEFAULT '0',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Lampu_Name_UNIQUE` (`Lampu_Name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mst_lampu`
--

LOCK TABLES `mst_lampu` WRITE;
/*!40000 ALTER TABLE `mst_lampu` DISABLE KEYS */;
INSERT INTO `mst_lampu` VALUES (1,'Lampu Depan',1,12),(2,'Lampu Tengah',1,14),(3,'Lampu Kamar Mandi',1,5),(4,'Lampu Kamar 1',1,10),(5,'Lampu Kamar 2',1,10);
/*!40000 ALTER TABLE `mst_lampu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblhistory_mode`
--

DROP TABLE IF EXISTS `tblhistory_mode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblhistory_mode` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Mode_Lampu` int NOT NULL,
  `Change_Date` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblhistory_mode`
--

LOCK TABLES `tblhistory_mode` WRITE;
/*!40000 ALTER TABLE `tblhistory_mode` DISABLE KEYS */;
INSERT INTO `tblhistory_mode` VALUES (1,2,'2021-03-27 17:20:08'),(2,1,'2021-03-27 17:20:12'),(3,2,'2021-04-02 21:38:31'),(4,1,'2021-04-02 21:38:35'),(5,2,'2021-04-02 21:38:37'),(6,1,'2021-04-02 21:38:39'),(7,2,'2021-04-02 22:04:11'),(8,1,'2021-04-02 22:04:14');
/*!40000 ALTER TABLE `tblhistory_mode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblmode_state`
--

DROP TABLE IF EXISTS `tblmode_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblmode_state` (
  `Mode_Lampu` int DEFAULT NULL,
  `Last_Change` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblmode_state`
--

LOCK TABLES `tblmode_state` WRITE;
/*!40000 ALTER TABLE `tblmode_state` DISABLE KEYS */;
INSERT INTO `tblmode_state` VALUES (1,'2021-04-02 22:04:14');
/*!40000 ALTER TABLE `tblmode_state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trx_history`
--

DROP TABLE IF EXISTS `trx_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `trx_history` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Lampu_ID` int NOT NULL,
  `Lampu_State` int DEFAULT '0',
  `Change_Date` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`,`Lampu_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trx_history`
--

LOCK TABLES `trx_history` WRITE;
/*!40000 ALTER TABLE `trx_history` DISABLE KEYS */;
INSERT INTO `trx_history` VALUES (1,3,2,'2021-03-27 17:20:22'),(2,4,2,'2021-03-27 17:20:28'),(3,1,2,'2021-03-27 17:20:30'),(4,5,2,'2021-03-27 17:23:00'),(5,3,1,'2021-03-27 17:27:57'),(6,5,1,'2021-04-02 17:27:59'),(7,2,2,'2021-03-27 17:37:07'),(8,3,2,'2021-03-27 17:37:27'),(9,4,1,'2021-04-02 15:30:53'),(10,2,1,'2021-04-02 15:30:56'),(11,5,2,'2021-04-02 15:31:02'),(12,1,1,'2021-04-02 15:31:16'),(13,1,2,'2021-04-02 22:04:15'),(14,2,2,'2021-04-02 22:04:17'),(15,2,1,'2021-04-02 22:04:18'),(16,1,1,'2021-04-02 22:04:19');
/*!40000 ALTER TABLE `trx_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vi_lamahidup_lampu`
--

DROP TABLE IF EXISTS `vi_lamahidup_lampu`;
/*!50001 DROP VIEW IF EXISTS `vi_lamahidup_lampu`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `vi_lamahidup_lampu` AS SELECT 
 1 AS `lampu_id`,
 1 AS `lampu_name`,
 1 AS `Watt`,
 1 AS `on_date`,
 1 AS `off_date`,
 1 AS `menit`,
 1 AS `jam`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vi_last_state`
--

DROP TABLE IF EXISTS `vi_last_state`;
/*!50001 DROP VIEW IF EXISTS `vi_last_state`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `vi_last_state` AS SELECT 
 1 AS `Lampu_ID`,
 1 AS `Lampu_Name`,
 1 AS `Lampu_State`,
 1 AS `Change_Date`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vi_on_off_lamp`
--

DROP TABLE IF EXISTS `vi_on_off_lamp`;
/*!50001 DROP VIEW IF EXISTS `vi_on_off_lamp`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `vi_on_off_lamp` AS SELECT 
 1 AS `lampu_id`,
 1 AS `on_date`,
 1 AS `off_date`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'smarthome_db'
--

--
-- Dumping routines for database 'smarthome_db'
--
/*!50003 DROP PROCEDURE IF EXISTS `GetOnOffData_Pager` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`SungaiPinang`@`localhost` PROCEDURE `GetOnOffData_Pager`(
_FROM_DATE TEXT
   ,_TO_DATE TEXT
)
BEGIN
       SET @RowNumber:=0;
 
       CREATE TEMPORARY TABLE Results
       select lampu_id, 
           case when on_date < _FROM_DATE and ifnull(off_date, sysdate()) >= _FROM_DATE
				then _FROM_DATE else on_date end as on_date, 
		   case when ifnull(off_date, sysdate()) > _TO_DATE then _TO_DATE 
           else ifnull(off_date, sysdate()) end as off_date from vi_on_off_lamp 
           where case when on_date < _FROM_DATE and ifnull(off_date, sysdate()) >= _FROM_DATE
				then _FROM_DATE else on_date end between _FROM_DATE and _TO_DATE;
 
       SELECT * FROM Results;
 
       DROP TEMPORARY TABLE Results;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `vi_lamahidup_lampu`
--

/*!50001 DROP VIEW IF EXISTS `vi_lamahidup_lampu`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`SungaiPinang`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vi_lamahidup_lampu` AS select `bb`.`lampu_id` AS `lampu_id`,`aa`.`Lampu_Name` AS `lampu_name`,`aa`.`Watt` AS `Watt`,`bb`.`on_date` AS `on_date`,`bb`.`off_date` AS `off_date`,timestampdiff(MINUTE,`bb`.`on_date`,ifnull(`bb`.`off_date`,sysdate())) AS `menit`,timestampdiff(HOUR,`bb`.`on_date`,ifnull(`bb`.`off_date`,sysdate())) AS `jam` from (`mst_lampu` `aa` left join `vi_on_off_lamp` `bb` on((`aa`.`ID` = `bb`.`lampu_id`))) group by `bb`.`lampu_id`,`bb`.`on_date` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vi_last_state`
--

/*!50001 DROP VIEW IF EXISTS `vi_last_state`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`SungaiPinang`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vi_last_state` AS select `mst`.`ID` AS `Lampu_ID`,`mst`.`Lampu_Name` AS `Lampu_Name`,ifnull(`dataa`.`Lampu_State`,1) AS `Lampu_State`,ifnull(`dataa`.`Change_Date`,str_to_date('Jan 01 0001','%M %d %Y')) AS `Change_Date` from (`mst_lampu` `mst` left join (select `dataa`.`ID` AS `ID`,`dataa`.`Lampu_ID` AS `Lampu_ID`,`dataa`.`Lampu_State` AS `Lampu_State`,`dataa`.`Change_Date` AS `Change_Date` from (select `m`.`ID` AS `ID`,`m`.`Lampu_ID` AS `Lampu_ID`,`m`.`Lampu_State` AS `Lampu_State`,`m`.`Change_Date` AS `Change_Date`,row_number() OVER (PARTITION BY `m`.`Lampu_ID` ORDER BY `m`.`Change_Date` desc )  AS `rn` from `trx_history` `m`) `dataa` where (`dataa`.`rn` = 1)) `dataa` on((`mst`.`ID` = `dataa`.`Lampu_ID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vi_on_off_lamp`
--

/*!50001 DROP VIEW IF EXISTS `vi_on_off_lamp`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`SungaiPinang`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vi_on_off_lamp` AS select `aa`.`Lampu_ID` AS `lampu_id`,`aa`.`Change_Date` AS `on_date`,(select `trx_history`.`Change_Date` from `trx_history` where ((`trx_history`.`Lampu_ID` = `aa`.`Lampu_ID`) and (`aa`.`Change_Date` <= `trx_history`.`Change_Date`) and (`trx_history`.`Lampu_State` = 1)) order by `trx_history`.`Change_Date` limit 0,1) AS `off_date` from `trx_history` `aa` where (`aa`.`Lampu_State` = 2) order by `aa`.`Lampu_ID`,`aa`.`Change_Date`,`aa`.`Lampu_State` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-27 10:47:04
