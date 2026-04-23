-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: shambaRecords
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('b312fbae-1042-487a-a882-1dae8e947edb','f3df5cea640b915fc09b38e2f3381a5679ab1ef4728803221ce4e396f3849eb5','2026-04-18 16:01:02.653','20260418160053_init',NULL,NULL,'2026-04-18 16:00:53.674',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fields`
--

DROP TABLE IF EXISTS `fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fields` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cropType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `plantingDate` datetime(3) NOT NULL,
  `stage` enum('PLANTED','GROWING','READY','HARVESTED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PLANTED',
  `notes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('ACTIVE','AT_RISK','COMPLETED') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assigned_to_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fields_assigned_to_id_idx` (`assigned_to_id`),
  CONSTRAINT `fields_assigned_to_id_fkey` FOREIGN KEY (`assigned_to_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fields`
--

LOCK TABLES `fields` WRITE;
/*!40000 ALTER TABLE `fields` DISABLE KEYS */;
INSERT INTO `fields` VALUES ('cmo5fa39o0001e72t63c9edjs','East Field 3','Beans','2026-04-10 00:00:00.000','GROWING','','ACTIVE',NULL,'2026-04-19 07:06:22.092','2026-04-22 12:08:38.491'),('cmo5fb3yx0002e72t1b8v09xn','West Field 4','Potatoes','2026-04-10 00:00:00.000','PLANTED','','ACTIVE','cmo8rqofh0001e73dfvty2zx2','2026-04-19 07:07:09.657','2026-04-22 12:26:13.478'),('cmo5fddog0004e72t1ydk8f1e','West Field 46','Potatoes','2026-04-10 00:00:00.000','GROWING','nothing','ACTIVE','cmo8rkd780002e7gyysvl1zg6','2026-04-19 07:08:55.506','2026-04-22 14:07:32.060'),('cmo5fdh320006e72t9j6q7vfn','West Field 46','Potatoes','2026-04-10 14:30:00.000','PLANTED',NULL,NULL,'cmo4obhpp0000e7vut2vvwpis','2026-04-19 07:08:59.966','2026-04-19 07:08:59.966'),('cmo5jcbip0001e7645wb9xwp2','West Field 86','Potatoes','2026-03-10 00:00:00.000','HARVESTED','','COMPLETED','cmo5ft3wg0000e7dyddczjqnh','2026-04-19 09:00:04.441','2026-04-22 12:29:10.372'),('cmo5jeecz0003e764rmbkh3cr','West Field 96','Potatoes','2026-04-10 14:30:00.000','GROWING',NULL,'ACTIVE','cmo4obhpp0000e7vut2vvwpis','2026-04-19 09:01:41.555','2026-04-19 09:03:21.120'),('cmoa13gsi0000e7zakbzrgaxt','West Field  98','Wheat','2026-04-21 00:00:00.000','HARVESTED','we planted the field','COMPLETED','cmo7b8i5l0000e7k4k77kn3uy','2026-04-22 12:28:09.282','2026-04-23 12:37:28.442');
/*!40000 ALTER TABLE `fields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('ADMIN','AGENT') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'AGENT',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('cmo4obhpp0000e7vut2vvwpis','timothy@gmail.com','$2b$10$S.H6hGdghE.cufpYVwupxO4r46U/G.98UgvkhN7fLelGSyZxu2v/m','AGENT','2026-04-18 18:31:37.837','2026-04-18 18:31:37.837'),('cmo5d7zb50000e7ff1ejd88wx','kimilu@gmail.com','$2b$10$6CsXa0GudB/3klFPRneSH.G1pgCGdkhOvMMBoyfmMvCV7Tb7Skxhe','ADMIN','2026-04-19 06:08:44.418','2026-04-19 06:08:44.418'),('cmo5diezt0000e7xood0jcu3q','kimemia@gmail.com','$2b$10$wZhCgv2xynP6mazTs1pHFekEdAX1nalwAgpKOUCpfH7DRGQfBV8FK','ADMIN','2026-04-19 06:16:51.290','2026-04-19 06:16:51.290'),('cmo5ft3wg0000e7dyddczjqnh','peter@gmail.com','$2b$10$R6GiomNZAuuXHBR2KUBKRO6B.cHlQgPA6BrJOm0Y1eAIkVoE3XpJO','AGENT','2026-04-19 07:21:09.377','2026-04-19 07:21:09.377'),('cmo7b8i5l0000e7k4k77kn3uy','atieno@gmail.com','$2b$10$EtFKxMuajTd/eLe9wE6PguDOAnieEVWayIPvaRqZdxlndR8DhO2tW','AGENT','2026-04-20 14:48:41.962','2026-04-20 14:48:41.962'),('cmo8rfy5c0000e7gyw9taij7k','makori@gmail.com','$2b$10$N.ABy942qluPAlMXrEpaAeUqHBoxlRyj83DfYaimbgDRC62l.bm7e','AGENT','2026-04-21 15:10:09.280','2026-04-21 15:10:09.280'),('cmo8rj9vz0001e7gypomnryld','ronalf@gmail.com','$2b$10$rAYtfi8KJvBxnuueyEFPdOtI6o4VAYWVGj8FXgPrM10nbJ0WmhDoC','AGENT','2026-04-21 15:12:44.496','2026-04-21 15:12:44.496'),('cmo8rkd780002e7gyysvl1zg6','peteroniel@gmail.com','$2b$10$kgFRvUGdbysyhr8JyoBEfeY/BqLaNd/QINyz6h19aPx5YTIi8PfiS','AGENT','2026-04-21 15:13:35.445','2026-04-21 15:13:35.445'),('cmo8rq5ku0000e73dygcr1edz','peterel@gmail.com','$2b$10$QxpH5UUKClX7V0mSiywbuuP1Ic7Og79k74vg1Vp5elH27LWvWVROu','AGENT','2026-04-21 15:18:05.502','2026-04-21 15:18:05.502'),('cmo8rqofh0001e73dfvty2zx2','kimem23ia@gmail.com','$2b$10$Hgrt8ZBVCvdmQ9etWyV0mOT0mn.UX06y0tGga9pxbaS5HDfLyoOeS','AGENT','2026-04-21 15:18:29.933','2026-04-21 15:18:29.933');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-23 16:23:07
