-- MySQL dump 10.13  Distrib 8.4.0, for Win64 (x86_64)
--
-- Host: localhost    Database: blog
-- ------------------------------------------------------
-- Server version	8.4.0

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
-- Table structure for table `aki_article`
--

DROP TABLE IF EXISTS `aki_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aki_article` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '文章ID',
  `title` varchar(256) DEFAULT NULL COMMENT '文章標題',
  `content` longtext COMMENT '文章內容',
  `summary` varchar(1024) DEFAULT NULL COMMENT '文章摘要',
  `category_id` bigint DEFAULT NULL COMMENT '所屬分類ID',
  `thumbnail` varchar(1024) DEFAULT NULL,
  `is_top` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `view_count` bigint DEFAULT '0' COMMENT '文章訪問量',
  `is_comment` varchar(255) DEFAULT NULL,
  `create_by` bigint DEFAULT NULL COMMENT '創建人ID',
  `create_time` datetime DEFAULT NULL COMMENT '創建時間',
  `update_by` bigint DEFAULT NULL COMMENT '更新人ID',
  `update_time` datetime DEFAULT NULL COMMENT '更新時間',
  `del_flag` int DEFAULT '0' COMMENT '邏輯刪除標示, 0為未被刪除, 1為已被刪除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='文章表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aki_article`
--

LOCK TABLES `aki_article` WRITE;
/*!40000 ALTER TABLE `aki_article` DISABLE KEYS */;
INSERT INTO `aki_article` VALUES
(1,'走進科普SpringBoot','# SpringBoot你怎麼看\n\n由chatGPT生成以下內容，僅做測試\n![](https://png.pngtree.com/png-clipart/20221025/original/pngtree-author-write-article-writer-workplace-png-image_8721233.png)\n\n\nSpringBoot是一個用於快速構建基於Spring框架的應用程序的開發框架。它簡化了Spring應用程序的配置和部署過程，讓開發者能夠更加專注於業務邏輯的實現。特點如下\n\n\n## 簡化配置\n\nSpringBoot提供了自動配置的特性，通過約定大於配置的原則，減少了開發者在配置文件中進行大量繁瑣的配置。開發者只需要關注自己的業務邏輯，而不用花費過多時間在配置上。\n\n> 內嵌伺服器\n\nSpringBoot默認集成了多種內嵌伺服器，如Tomcat、Jetty等，開發者無需手動部署應用程序到外部伺服器，只需簡單地打包成可執行的JAR文件，即可運行應用程序。\n\n> 自動裝配\n\nSpringBoot可以根據項目的依賴自動裝配相應的組件和配置，大大減少了手動配置的工作量。開發者只需在項目的依賴管理文件中添加相應的依賴，SpringBoot就會自動根據依賴進行配置。\n\n> 簡化開發\n\nSpringBoot提供了豐富的開發工具和插件，能夠幫助開發者更高效地進行開發。例如，SpringBootDevTools可以實現熱部署，修改代碼後無需重啟應用程序即可生效。\n\n> 使用示例\n\n下面是一個簡單的SpringBoot應用程序示例：\n~~~~java\nimport org.springframework.boot.SpringApplication;\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\nimport org.springframework.web.bind.annotation.GetMapping;\nimport org.springframework.web.bind.annotation.RestController;\n\n@SpringBootApplication@RestControllerpublic class MyApplication {\n \n public static void main(String[] args) {\n SpringApplication.run(MyApplication.class, args);\n }\n\n @GetMapping(\"/\")\n public String hello() {\n return \"Hello, World!\";\n }\n}\n~~~~','測試文章',1,'https://png.pngtree.com/png-clipart/20221025/original/pngtree-author-write-article-writer-workplace-png-image_8721233.png','0','0',11,'0',1,'2024-07-09 12:00:00',1,'2024-07-09 12:00:00',0),
(2,'MySQL知識','# mysql介紹\n\n由chatGPT生成以下內容，僅做測試\n\n![](https://png.pngtree.com/png-clipart/20221025/original/pngtree-author-write-article-writer-workplace-png-image_8721233.png)\n\n在當今數據驅動的世界中，學習和掌握數據庫管理系統是非常重要的。MySQL作為最流行的開源關係型數據庫管理系統之一，為許多應用程序和網站提供了可靠的數據存儲和管理。下面是學習MySQL的一些日常步驟和要點，幫助你快速入門和提升技能。\n\n> 1. 安裝和配置MySQL\n\n首先，你需要下載並安裝MySQL數據庫。根據你的操作系統，選擇適合的MySQL版本，並按照安裝向導進行安裝。安裝完成後，確保正確配置MySQL以確保正常運行。\n\n> 2. 學習SQL語言\n\nSQL是結構化查詢語言，用於與數據庫進行交互。學習SQL語言是學習MySQL的關鍵。了解基本的SQL語法，包括創建表、插入數據、查詢數據、更新數據和刪除數據等操作。通過練習和實踐，逐漸掌握SQL語言的使用。\n\n> 3. 數據庫設計和規範化\n\n學習MySQL還需要了解數據庫設計和規範化的概念。掌握數據庫設計原則和規範化技術，以確保數據庫結構的合理性和數據的完整性。了解主鍵、外鍵、索引等概念，並學會在數據庫中應用它們。\n\n> 4. 數據庫管理和維護\n\n學習MySQL還包括數據庫管理和維護的技能。了解如何備份和恢復數據庫，如何優化查詢性能，如何監控和管理數據庫伺服器等。學習並掌握MySQL提供的管理工具和命令，以便有效地管理和維護數據庫。\n\n> 5. 學習高級特性和擴展\n\n除了基本的SQL語言和數據庫管理技能，學習MySQL的過程中還可以深入了解一些高級特性和擴展。例如，學習存儲過程、觸發器和視圖等高級功能，以及如何使用MySQL與編程語言進行集成。\n\n> 6. 參考文檔和資源\n\n學習MySQL的過程中，及時查閱官方文檔和其他相關資源是非常重要的。MySQL官方文檔提供了詳細的說明和示例，可以幫助你理解和掌握MySQL的各種功能和用法。此外，還可以參考在線教程、書籍和社區論壇等資源，與其他MySQL學習者交流和分享經驗。\n\n學習MySQL需要時間和實踐，但隨著不斷的學習和實踐，你將逐漸掌握MySQL的技能，並能夠靈活運用它來處理各種數據管理任務。希望以上步驟和要點能幫助你在學習MySQL的道路上取得成功！','測試文章',2,'https://png.pngtree.com/png-clipart/20221025/original/pngtree-author-write-article-writer-workplace-png-image_8721233.png','1','0',195,'0',1,'2024-07-09 12:00:00',1,'2024-07-09 12:00:00',0),
(3,'科普知識','# 科普知識\n\n由chatGPT生成以下內容，僅做測試。\n\n![](https://png.pngtree.com/png-clipart/20221025/original/pngtree-author-write-article-writer-workplace-png-image_8721233.png)\n\n> 養成和訓練人體記憶力的重要性\n\n人體的記憶力是我們日常生活中非常重要的一項能力。它不僅有助於我們記住重要的信息和經歷，還能夠幫助我們提高學習效率和解決問題的能力。然而，很多人可能發現自己的記憶力並不是很好，經常會忘記一些重要的事情。\n\n> 良好的生活習慣\n\n良好的生活習慣對於記憶力的提升非常重要。保持充足的睡眠和合理的飲食可以幫助大腦更好地運轉，提高記憶力。此外，定期進行體育鍛煉也能夠促進血液循環，增加大腦的供氧量，有助於記憶力的提升。\n\n> 記憶訓練\n\n我們可以通過一些特定的記憶訓練來提高記憶力。例如，使用記憶宮殿法可以幫助我們記住一系列的事物。這種方法將要記憶的事物與一個已知的地點或者房間聯繫起來，通過想像在這個地點或者房間中進行一次虛擬的旅行，將事物與地點進行關聯，可以幫助我們更好地記住它們。\n\n> 閱讀和學習\n\n閱讀可以幫助我們鍛煉大腦的思維能力和邏輯思維能力，而學習新知識可以激發大腦的學習能力，提高記憶力。\n\n> 記憶技巧\n\n我們還可以通過一些記憶技巧來提高記憶力。例如，使用關鍵詞、圖像和聯想等方法可以幫助我們更好地記憶信息。另外，將要記憶的信息進行分類整理，可以幫助我們更好地記憶和回憶。\n\n養成和訓練人體記憶力是一個需要長期堅持和努力的過程。通過良好的生活習慣、記憶訓練、閱讀學習和記憶技巧的綜合應用，我們可以提高自己的記憶力，更好地應對日常生活和工作中的各種挑戰。','測試文章',4,'https://png.pngtree.com/png-clipart/20221025/original/pngtree-author-write-article-writer-workplace-png-image_8721233.png','0','0',11,'0',1,'2024-07-09 12:00:00',3,'2024-07-23 02:13:05',0),
(4,'測試文章0725','# 測試文章0725 #','測試文章0725摘要',1,'https://png.pngtree.com/png-clipart/20221025/original/pngtree-author-write-article-writer-workplace-png-image_8721233.png','0','0',8,'0',3,'2024-07-25 17:12:04',3,'2024-07-25 17:23:25',0);
/*!40000 ALTER TABLE `aki_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aki_article_tag`
--

DROP TABLE IF EXISTS `aki_article_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aki_article_tag` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '文章-標籤關聯表ID',
  `article_id` bigint NOT NULL COMMENT '文章ID',
  `tag_id` bigint NOT NULL COMMENT '標籤ID',
  PRIMARY KEY (`id`),
  KEY `article_id` (`article_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `aki_article_tag_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `aki_article` (`id`),
  CONSTRAINT `aki_article_tag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `aki_tag` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='文章標籤關聯表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aki_article_tag`
--

LOCK TABLES `aki_article_tag` WRITE;
/*!40000 ALTER TABLE `aki_article_tag` DISABLE KEYS */;
INSERT INTO `aki_article_tag` VALUES (1,1,11),(2,2,11),(5,3,11),(8,4,1),(9,4,3);
/*!40000 ALTER TABLE `aki_article_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aki_category`
--

DROP TABLE IF EXISTS `aki_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aki_category` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '分類ID',
  `name` varchar(128) DEFAULT NULL COMMENT '分類名稱',
  `pid` bigint DEFAULT '-1' COMMENT '父分類ID，若沒有對應父分類則為-1',
  `description` varchar(512) DEFAULT NULL COMMENT '分類描述',
  `status` varchar(255) DEFAULT NULL,
  `create_by` bigint DEFAULT NULL COMMENT '創建人ID',
  `create_time` datetime DEFAULT NULL COMMENT '創建時間',
  `update_by` bigint DEFAULT NULL COMMENT '更新人ID',
  `update_time` datetime DEFAULT NULL COMMENT '更新時間',
  `del_flag` int DEFAULT '0' COMMENT '邏輯刪除標示, 0為未被刪除, 1為已被刪除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='分類表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aki_category`
--

LOCK TABLES `aki_category` WRITE;
/*!40000 ALTER TABLE `aki_category` DISABLE KEYS */;
INSERT INTO `aki_category` VALUES (1,'SpringBoot',-1,'SpringBoot分類','0',1,'2024-07-09 12:00:00',3,'2024-07-22 15:03:33',0),(2,'MySQL',-1,'MySQL分類','0',1,'2024-07-09 12:00:00',1,'2024-07-09 12:00:00',0),(3,'JAVA',-1,'Java分類','0',1,'2024-07-09 12:00:00',5,'2024-07-12 22:12:54',0),(4,'JavaScript',-1,'Js分類','0',1,'2024-07-09 12:00:00',3,'2024-07-25 17:23:39',0);
/*!40000 ALTER TABLE `aki_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aki_comment`
--

DROP TABLE IF EXISTS `aki_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aki_comment` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '評論ID',
  `type` varchar(255) DEFAULT NULL,
  `article_id` bigint DEFAULT NULL COMMENT '文章ID',
  `root_id` bigint DEFAULT '-1' COMMENT '根評論ID',
  `content` varchar(512) DEFAULT NULL COMMENT '評論內容',
  `to_comment_user_id` bigint DEFAULT '-1' COMMENT '所回覆的目標評論之userId',
  `to_comment_id` bigint DEFAULT '-1' COMMENT '回覆目標評論之ID',
  `create_by` bigint DEFAULT NULL COMMENT '創建人ID',
  `create_time` datetime DEFAULT NULL COMMENT '創建時間',
  `update_by` bigint DEFAULT NULL COMMENT '更新人ID',
  `update_time` datetime DEFAULT NULL COMMENT '更新時間',
  `del_flag` int DEFAULT '0' COMMENT '邏輯刪除標示, 0為未被刪除, 1為已被刪除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='評論表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aki_comment`
--

LOCK TABLES `aki_comment` WRITE;
/*!40000 ALTER TABLE `aki_comment` DISABLE KEYS */;
INSERT INTO `aki_comment` VALUES (1,'0',2,-1,'測試評論1',-1,-1,2,'2024-07-09 12:00:00',2,'2024-07-09 12:00:00',0),(2,'0',2,1,'測試評論2',2,1,2,'2024-07-09 12:00:00',2,'2024-07-09 12:00:00',0),(3,'0',3,-1,'測試評論3',-1,-1,2,'2024-07-09 12:00:00',2,'2024-07-09 12:00:00',0),(4,'0',2,-1,'測試評論4',-1,-1,2,'2024-07-09 12:00:00',2,'2024-07-09 12:00:00',0),(5,'0',2,4,'測試評論5',2,4,2,'2024-07-09 12:00:00',2,'2024-07-09 12:00:00',0),(6,'0',2,1,'測試評論5[微笑][微笑][棒]',2,2,3,'2024-07-12 21:35:20',3,'2024-07-12 21:35:20',0),(7,'0',2,1,'測試評論6',2,1,3,'2024-07-13 23:20:53',3,'2024-07-13 23:20:53',0),(8,'0',2,1,'測試評論7',2,1,3,'2024-07-13 23:20:57',3,'2024-07-13 23:20:57',0),(9,'0',2,1,'測試評論8',3,8,3,'2024-07-13 23:21:02',3,'2024-07-13 23:21:02',0),(10,'0',2,1,'測試評論9',3,9,3,'2024-07-13 23:21:08',3,'2024-07-13 23:21:08',0),(11,'0',2,1,'測試評論',2,1,3,'2024-07-13 23:30:43',3,'2024-07-13 23:30:43',0),(12,'1',1,-1,'Youtube is great ![微笑]',-1,-1,3,'2024-07-21 17:59:59',3,'2024-07-21 17:59:59',0);
/*!40000 ALTER TABLE `aki_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aki_link`
--

DROP TABLE IF EXISTS `aki_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aki_link` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '友情連結ID',
  `name` varchar(256) DEFAULT NULL COMMENT '友情連結名稱',
  `logo` varchar(256) DEFAULT NULL COMMENT '友情連結LOGO',
  `description` varchar(512) DEFAULT NULL COMMENT '友情連結描述',
  `address` varchar(128) DEFAULT NULL COMMENT '友情連結網址',
  `status` varchar(255) DEFAULT NULL,
  `create_by` bigint DEFAULT NULL COMMENT '創建人ID',
  `create_time` datetime DEFAULT NULL COMMENT '創建時間',
  `update_by` bigint DEFAULT NULL COMMENT '更新人ID',
  `update_time` datetime DEFAULT NULL COMMENT '更新時間',
  `del_flag` int DEFAULT '0' COMMENT '邏輯刪除標示, 0為未被刪除, 1為已被刪除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='友情連結表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aki_link`
--

LOCK TABLES `aki_link` WRITE;
/*!40000 ALTER TABLE `aki_link` DISABLE KEYS */;
INSERT INTO `aki_link` VALUES (1,'Youtube','https://static.vecteezy.com/system/resources/previews/023/986/704/non_2x/youtube-logo-youtube-logo-transparent-youtube-icon-transparent-free-free-png.png','訪問Youtube','https://www.youtube.com/','0',1,'2024-07-09 12:00:00',1,'2024-07-09 12:00:00',0),(2,'Instagram','https://static.vecteezy.com/system/resources/previews/018/910/697/non_2x/instagram-mobile-app-logo-instagram-app-icon-ig-app-free-free-vector.jpg','訪問Instagram','https://www.instagram.com/','0',1,'2024-07-09 12:00:00',1,'2024-07-09 12:00:00',0),(3,'Facebook','https://static.vecteezy.com/system/resources/previews/008/385/647/non_2x/facebook-social-media-logo-abstract-symbol-design-illustration-free-vector.jpg','訪問Facebook','https://www.facebook.com/','0',1,'2024-07-09 12:00:00',1,'2024-07-09 12:00:00',0),(4,'Discord','https://static.vecteezy.com/system/resources/previews/006/892/625/non_2x/discord-logo-icon-editorial-free-vector.jpg','訪問Discord','https://discord.com/','0',1,'2024-07-09 12:00:00',1,'2024-07-09 12:00:00',0),(5,'Github','https://static.vecteezy.com/system/resources/previews/016/833/872/non_2x/github-logo-git-hub-icon-on-white-background-free-vector.jpg','訪問Github','https://github.com/','0',1,'2024-07-09 12:00:00',1,'2024-07-09 12:00:00',0),(6,'Google','https://static.vecteezy.com/system/resources/previews/010/353/285/non_2x/colourful-google-logo-on-white-background-free-vector.jpg','訪問Google','https://www.google.com.tw/','1',1,'2024-07-09 12:00:00',1,'2024-07-09 12:00:00',0),(7,'Yahoo','https://static.vecteezy.com/system/resources/thumbnails/020/975/585/small_2x/yahoo-logo-yahoo-icon-transparent-free-png.png','訪問Yahoo','https://tw.yahoo.com/','1',1,'2024-07-09 12:00:00',1,'2024-07-09 12:00:00',0),(8,'Chatgpt','https://static.vecteezy.com/system/resources/previews/021/059/825/original/chatgpt-logo-chat-gpt-icon-on-green-background-free-vector.jpg','訪問ChatGpt','https://chatgpt.com/','2',1,'2024-07-09 12:00:00',3,'2024-07-25 17:24:37',0);
/*!40000 ALTER TABLE `aki_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aki_tag`
--

DROP TABLE IF EXISTS `aki_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aki_tag` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '標籤ID',
  `name` varchar(128) DEFAULT NULL COMMENT '標籤名稱',
  `create_by` bigint DEFAULT NULL COMMENT '創建人ID',
  `create_time` datetime DEFAULT NULL COMMENT '創建時間',
  `update_by` bigint DEFAULT NULL COMMENT '更新人ID',
  `update_time` datetime DEFAULT NULL COMMENT '更新時間',
  `remark` varchar(500) DEFAULT NULL COMMENT '備註',
  `del_flag` int DEFAULT '0' COMMENT '邏輯刪除標示, 0為未被刪除, 1為已被刪除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='標籤表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aki_tag`
--

LOCK TABLES `aki_tag` WRITE;
/*!40000 ALTER TABLE `aki_tag` DISABLE KEYS */;
INSERT INTO `aki_tag` VALUES (1,'日誌',1,'2024-07-09 12:00:00',1,'2024-07-09 12:00:00','日誌撰寫',0),(2,'開發',1,'2024-07-09 12:00:00',1,'2024-07-09 12:00:00','開發心得',0),(3,'日常',1,'2024-07-09 12:00:00',1,'2024-07-09 12:00:00','日常小事',0),(4,'管理',1,'2024-07-09 12:00:00',1,'2024-07-09 12:00:00','管理心得',0),(5,'辦公',1,'2024-07-09 12:00:00',1,'2024-07-09 12:00:00','辦公心情抒發',0),(6,'筆記',1,'2024-07-09 12:00:00',1,'2024-07-09 12:00:00','學習筆記',0),(7,'校園',1,'2024-07-09 12:00:00',1,'2024-07-09 12:00:00','日常校園大小事',0),(8,'美食',1,'2024-07-09 12:00:00',1,'2024-07-09 12:00:00','美食紀錄',0),(9,'學習',1,'2024-07-09 12:00:00',1,'2024-07-09 12:00:00','學習心得',0),(10,'風景',1,'2024-07-09 12:00:00',3,'2024-07-25 17:24:51','風景景觀記述',0),(11,'生成',1,'2024-07-09 12:00:00',3,'2024-07-23 02:24:20','ChatGPT生成文',0);
/*!40000 ALTER TABLE `aki_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_menu`
--

DROP TABLE IF EXISTS `sys_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_menu` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '菜單ID',
  `menu_name` varchar(50) NOT NULL COMMENT '菜單名稱',
  `parent_id` bigint DEFAULT '0' COMMENT '父菜單ID',
  `order_num` int NOT NULL DEFAULT '0' COMMENT '顯示順序',
  `path` varchar(200) DEFAULT '' COMMENT '路由',
  `component` varchar(255) DEFAULT NULL COMMENT '組件路徑',
  `is_frame` int DEFAULT '1' COMMENT '是否為外部連結, 0是, 1否',
  `menu_type` varchar(255) DEFAULT NULL,
  `visible` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `perms` varchar(100) DEFAULT NULL COMMENT '權限標示',
  `icon` varchar(100) DEFAULT '#' COMMENT '菜單圖示',
  `create_by` bigint DEFAULT NULL COMMENT '創建人ID',
  `create_time` datetime DEFAULT NULL COMMENT '創建時間',
  `update_by` bigint DEFAULT NULL COMMENT '更新人ID',
  `update_time` datetime DEFAULT NULL COMMENT '更新時間',
  `remark` varchar(500) DEFAULT '' COMMENT '備註',
  `del_flag` int DEFAULT '0' COMMENT '邏輯刪除標示, 0為未被刪除, 1為被刪除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2052 DEFAULT CHARSET=utf8mb3 COMMENT='菜單權限表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_menu`
--

LOCK TABLES `sys_menu` WRITE;
/*!40000 ALTER TABLE `sys_menu` DISABLE KEYS */;
INSERT INTO `sys_menu` VALUES (1,'系統管理',0,0,'system',NULL,1,'M','0','0',NULL,'system',0,'2024-07-09 12:00:00',3,'2024-07-22 15:02:10','系统管理目錄',0),(2,'内容管理',0,1,'content',NULL,1,'M','0','0',NULL,'tab',0,'2024-07-09 12:00:00',3,'2024-07-25 17:31:38','內容管理目錄',0),(3,'寫文章',0,2,'write','content/article/write/index',1,'C','0','0','content:article:writer','build',0,'2024-07-09 12:00:00',3,'2024-07-23 02:08:00','寫文章目錄',0),(100,'用戶管理',1,0,'user','system/user/index',1,'C','0','0','system:user:list','user',0,'2024-07-09 12:00:00',3,'2024-07-14 14:14:18','用戶管理菜單',0),(101,'角色管理',1,1,'role','system/role/index',1,'C','0','0','system:role:list','peoples',0,'2024-07-09 12:00:00',3,'2024-07-14 14:14:23','角色管理菜單',0),(102,'菜單管理',1,2,'menu','system/menu/index',1,'C','0','0','system:menu:list','tree-table',0,'2024-07-09 12:00:00',3,'2024-07-14 14:14:26','菜單管理菜單',0),(200,'分類管理',2,0,'category','content/category/index',1,'C','0','0','content:category:list','example',0,'2024-07-09 12:00:00',3,'2024-07-14 14:14:32','分類管理菜單',0),(201,'文章管理',2,1,'article','content/article/index',1,'C','0','0','content:article:list','build',0,'2024-07-09 12:00:00',3,'2024-07-14 14:14:36','文章管理菜單',0),(202,'標籤管理',2,2,'tag','content/tag/index',1,'C','0','0','content:tag:index','button',0,'2024-07-09 12:00:00',3,'2024-07-14 14:14:40','標籤管理菜單',0),(203,'友情連結管理',2,3,'link','content/link/index',1,'C','0','0','content:link:list','404',0,'2024-07-09 12:00:00',3,'2024-07-14 14:14:44','友情連結管理菜單',0),(1001,'用戶查詢',100,0,'',NULL,1,'F','0','0','system:user:query','#',0,'2024-07-09 12:00:00',3,'2024-07-14 14:13:28','用戶查詢按鈕',0),(1002,'用戶新增',100,1,'',NULL,1,'F','0','0','system:user:add','#',0,'2024-07-09 12:00:00',3,'2024-07-14 14:13:30','用戶新增按鈕',0),(1003,'用戶修改',100,2,'',NULL,1,'F','0','0','system:user:edit','#',0,'2024-07-09 12:00:00',3,'2024-07-14 14:13:33','用戶修改按鈕',0),(1004,'用戶刪除',100,3,'',NULL,1,'F','0','0','system:user:remove','#',0,'2024-07-09 12:00:00',3,'2024-07-14 14:13:36','用戶刪除按鈕',0),(1005,'重置密碼',100,4,'',NULL,1,'F','0','0','system:user:resetPwd','#',0,'2024-07-09 12:00:00',3,'2024-07-14 14:13:40','重置密碼按鈕',0),(1011,'角色查詢',101,0,'',NULL,1,'F','0','0','system:role:query','#',0,'2024-07-09 12:00:00',3,'2024-07-14 14:12:53','角色查詢按鈕',0),(1012,'角色新增',101,1,'',NULL,1,'F','0','0','system:role:add','#',0,'2024-07-09 12:00:00',3,'2024-07-14 14:12:56','角色新增按鈕',0),(1013,'角色修改',101,2,'',NULL,1,'F','0','0','system:role:edit','#',0,'2024-07-09 12:00:00',3,'2024-07-14 14:12:59','角色修改按鈕',0),(1014,'角色刪除',101,3,'',NULL,1,'F','0','0','system:role:remove','#',0,'2024-07-09 12:00:00',3,'2024-07-14 14:13:02','角色刪除按鈕',0),(1021,'菜單查詢',102,0,'',NULL,1,'F','0','0','system:menu:query','#',0,'2024-07-09 12:00:00',3,'2024-07-14 14:13:12','菜單查詢按鈕',0),(1022,'菜單新增',102,1,'',NULL,1,'F','0','0','system:menu:add','#',0,'2024-07-09 12:00:00',3,'2024-07-14 14:13:15','菜單新增按鈕',0),(1023,'菜單修改',102,2,'',NULL,1,'F','0','0','system:menu:edit','#',0,'2024-07-09 12:00:00',3,'2024-07-14 14:13:18','菜單修改按鈕',0),(1024,'菜單刪除',102,3,'',NULL,1,'F','0','0','system:menu:remove','#',0,'2024-07-09 12:00:00',3,'2024-07-14 14:13:20','菜單刪除按鈕',0),(2001,'導出分類',200,4,'',NULL,1,'F','0','0','content:category:export','#',0,'2024-07-09 12:00:00',3,'2024-07-12 22:10:10','導出分類按紐',0),(2031,'友情連結新增',203,1,'',NULL,1,'F','0','0','content:link:add','#',0,'2024-07-09 12:00:00',0,'2024-07-09 12:00:00','友情連結新增按鈕',0),(2032,'友情連結修改',203,2,'',NULL,1,'F','0','0','content:link:edit','#',0,'2024-07-09 12:00:00',0,'2024-07-09 12:00:00','友情連結修改按鈕',0),(2033,'友情連結刪除',203,3,'',NULL,1,'F','0','0','content:link:remove','#',0,'2024-07-09 12:00:00',0,'2024-07-09 12:00:00','友情連結刪除按鈕',0),(2034,'友情連結查詢',203,0,'',NULL,1,'F','0','0','content:link:query','#',0,'2024-07-09 12:00:00',3,'2024-07-14 00:16:17','友情連結查詢按鈕',0),(2035,'分類查詢',200,0,NULL,NULL,1,'F','0','0','content:category:query',NULL,3,'2024-07-12 22:09:54',3,'2024-07-12 22:09:54',NULL,0),(2036,'分類新增',200,1,NULL,NULL,1,'F','0','0','content:category:add',NULL,3,'2024-07-12 22:10:40',3,'2024-07-12 22:10:40',NULL,0),(2037,'分類修改',200,2,NULL,NULL,1,'F','0','0','content:category:edit',NULL,3,'2024-07-12 22:11:16',3,'2024-07-12 22:11:16',NULL,0),(2038,'分類刪除',200,3,NULL,NULL,1,'F','0','0','content:category:remove',NULL,3,'2024-07-12 22:11:40',3,'2024-07-12 22:11:51',NULL,0),(2039,'導出文章',201,4,NULL,NULL,1,'F','0','0','content:article:export',NULL,3,'2024-07-14 00:07:42',3,'2024-07-14 00:12:14',NULL,0),(2040,'文章查詢',201,0,NULL,NULL,1,'F','0','0','content:article:query',NULL,3,'2024-07-14 00:12:52',3,'2024-07-14 00:12:52',NULL,0),(2041,'文章新增',201,1,NULL,NULL,1,'F','0','0','content:article:add',NULL,3,'2024-07-14 00:13:13',3,'2024-07-14 00:13:13',NULL,0),(2042,'文章修改',201,2,NULL,NULL,1,'F','0','0','content:article:edit',NULL,3,'2024-07-14 00:13:33',3,'2024-07-14 00:13:33',NULL,0),(2043,'文章刪除',201,3,NULL,NULL,1,'F','0','0','content:article:remove',NULL,3,'2024-07-14 00:13:51',3,'2024-07-14 00:13:51',NULL,0),(2044,'導出標籤',202,4,NULL,NULL,1,'F','0','0','content:tag:export',NULL,3,'2024-07-14 00:14:51',3,'2024-07-14 00:14:51',NULL,0),(2045,'標籤查詢',202,0,NULL,NULL,1,'F','0','0','content:tag:query',NULL,3,'2024-07-14 00:15:15',3,'2024-07-14 00:15:15',NULL,0),(2046,'標籤新增',202,1,NULL,NULL,1,'F','0','0','content:tag:add',NULL,3,'2024-07-14 00:15:27',3,'2024-07-14 00:15:27',NULL,0),(2047,'標籤修改',202,2,NULL,NULL,1,'F','0','0','content:tag:edit',NULL,3,'2024-07-14 00:15:43',3,'2024-07-14 00:15:43',NULL,0),(2048,'標籤刪除',202,3,NULL,NULL,1,'F','0','0','content:tag:remove',NULL,3,'2024-07-14 00:16:01',3,'2024-07-14 00:16:01',NULL,0),(2049,'導出友情連節',203,4,NULL,NULL,1,'F','0','0','content:link:export',NULL,3,'2024-07-14 00:16:41',3,'2024-07-14 00:16:41',NULL,0),(2050,'用戶導出',100,5,NULL,NULL,1,'F','0','0','system:user:export',NULL,3,'2024-07-14 14:07:41',3,'2024-07-14 14:13:43',NULL,0),(2051,'角色導出',101,4,NULL,NULL,1,'F','0','0','system:role:export',NULL,3,'2024-07-14 14:08:15',3,'2024-07-14 14:08:15',NULL,0);
/*!40000 ALTER TABLE `sys_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_role`
--

DROP TABLE IF EXISTS `sys_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_role` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `role_name` varchar(32) NOT NULL COMMENT '角色名稱',
  `role_key` varchar(128) NOT NULL COMMENT '角色權限字串',
  `role_sort` int NOT NULL DEFAULT '0' COMMENT '顯示順序',
  `status` varchar(255) DEFAULT NULL,
  `create_by` bigint DEFAULT NULL COMMENT '創建人ID',
  `create_time` datetime DEFAULT NULL COMMENT '創建時間',
  `update_by` bigint DEFAULT NULL COMMENT '更新人ID',
  `update_time` datetime DEFAULT NULL COMMENT '更新時間',
  `remark` varchar(500) DEFAULT NULL COMMENT '備註',
  `del_flag` int DEFAULT '0' COMMENT '邏輯刪除標示, 0為未被刪除, 1為被刪除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COMMENT='角色表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_role`
--

LOCK TABLES `sys_role` WRITE;
/*!40000 ALTER TABLE `sys_role` DISABLE KEYS */;
INSERT INTO `sys_role` VALUES (1,'超級管理員','system:admin',1,'0',NULL,'2024-07-09 12:00:00',3,'2024-07-14 14:08:27','我是超級管理員',0),(2,'普通角色','system:common',2,'0',NULL,'2024-07-09 12:00:00',4,'2024-07-09 22:33:04','我是普通角色',0),(3,'開發人員','system:dev',3,'0',NULL,'2024-07-09 12:00:00',3,'2024-07-25 17:30:42','我是開發人員',0),(4,'測試人員','system:test',4,'0',3,'2024-07-22 16:01:15',3,'2024-07-22 16:01:35','測試人員',1);
/*!40000 ALTER TABLE `sys_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_role_menu`
--

DROP TABLE IF EXISTS `sys_role_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_role_menu` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '角色-菜單關聯表ID',
  `role_id` bigint NOT NULL COMMENT '角色ID',
  `menu_id` bigint NOT NULL COMMENT '菜單ID',
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  KEY `menu_id` (`menu_id`),
  CONSTRAINT `sys_role_menu_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`),
  CONSTRAINT `sys_role_menu_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `sys_menu` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=353 DEFAULT CHARSET=utf8mb3 COMMENT='角色菜單關聯表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_role_menu`
--

LOCK TABLES `sys_role_menu` WRITE;
/*!40000 ALTER TABLE `sys_role_menu` DISABLE KEYS */;
INSERT INTO `sys_role_menu` VALUES (82,2,2),(83,2,200),(84,2,2001),(249,1,1),(250,1,2),(251,1,3),(252,1,100),(253,1,101),(254,1,102),(255,1,200),(256,1,201),(257,1,202),(258,1,203),(259,1,1001),(260,1,1002),(261,1,1003),(262,1,1004),(263,1,1005),(264,1,1011),(265,1,1012),(266,1,1013),(267,1,1014),(268,1,1021),(269,1,1022),(270,1,1023),(271,1,1024),(272,1,2001),(273,1,2031),(274,1,2032),(275,1,2033),(276,1,2034),(277,1,2035),(278,1,2036),(279,1,2037),(280,1,2038),(281,1,2039),(282,1,2040),(283,1,2041),(284,1,2042),(285,1,2043),(286,1,2044),(287,1,2045),(288,1,2046),(289,1,2047),(290,1,2048),(291,1,2049),(292,1,2050),(293,1,2051),(315,4,1),(316,4,3),(317,4,100),(318,4,101),(319,4,102),(320,4,1001),(321,4,1002),(322,4,1003),(323,4,1004),(324,4,1005),(325,4,1011),(326,4,1012),(327,4,1013),(328,4,1014),(329,4,1021),(330,4,1022),(331,4,1023),(332,4,1024),(333,4,2050),(334,4,2051),(344,3,1),(345,3,2),(346,3,3),(347,3,101),(348,3,200),(349,3,2035),(350,3,2036),(351,3,2037),(352,3,2038);
/*!40000 ALTER TABLE `sys_role_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user`
--

DROP TABLE IF EXISTS `sys_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_user` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用戶ID',
  `user_name` varchar(64) NOT NULL DEFAULT 'NULL' COMMENT '用戶名稱',
  `nick_name` varchar(64) NOT NULL DEFAULT 'NULL' COMMENT '暱稱',
  `password` varchar(128) NOT NULL DEFAULT 'NULL' COMMENT '密碼',
  `type` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL COMMENT '電子郵件',
  `phone_number` varchar(32) DEFAULT NULL COMMENT '手機號碼',
  `sex` varchar(255) DEFAULT NULL,
  `avatar` varchar(1024) DEFAULT NULL COMMENT '大頭貼',
  `create_by` bigint DEFAULT NULL COMMENT '創建人ID',
  `create_time` datetime DEFAULT NULL COMMENT '創建時間',
  `update_by` bigint DEFAULT NULL COMMENT '更新人ID',
  `update_time` datetime DEFAULT NULL COMMENT '更新時間',
  `del_flag` int DEFAULT '0' COMMENT '邏輯刪除標誌, 0為未被刪除, 1為被刪除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用戶表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user`
--

LOCK TABLES `sys_user` WRITE;
/*!40000 ALTER TABLE `sys_user` DISABLE KEYS */;
INSERT INTO `sys_user` VALUES (1,'akichou','AKI','$2a$10$$2a$10$zc1G1usBD2/S2nJdfS.nruU/IpEZTrOtYeAaQ.P66LfceuJQSeUFS','0','0','akichou0106@gmail.com','0909620600','0','https://i.pinimg.com/564x/cc/d5/30/ccd5301944c188421702a67e58d2947f.jpg',NULL,'2024-07-09 12:00:00',NULL,'2024-07-09 12:00:00',1),(2,'tester','NORMAL','$2a$10$Cjxu8UwfmUYvgzy7VJexke3suuKNM9bwy8ENHj4UEzBmMZX5p.OBm','0','0','test123@gmail.com','0952211563','1','https://i.pinimg.com/564x/37/f7/a2/37f7a2a9ddf245b8c3b3403a36d83b70.jpg',NULL,'2024-07-09 12:00:00',NULL,'2024-07-09 12:00:00',1),(3,'white00000','小白白','$2a$10$IWkqH8NsVqxOapOHqmx4V.GaXUGLibpLGg.L.9qaEiUF/mmjPWWhW','1','0','testjp46@gmail.com','0909620601','0','http://localhost:9000/aki-blog/2024/07/12/9dac9ce774c645d199010f824e72c02f.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=aki-blog-user%2F20240712%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240712T114345Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=6912002c9ae3767ec721024cba69fecdba73a3eeaae3a7495fd9af5acca46e71',3,'2024-07-22 15:56:16',3,'2024-07-25 17:21:35',0),(4,'black11111','小黑','$2a$10$XLXXrmyj.NvEFl2oKnyhRODJeOadqUFBkoTTj68opvrVDppugrajS','0','0','black@gmail.com','0909620602','1','https://i.pinimg.com/564x/cc/d5/30/ccd5301944c188421702a67e58d2947f.jpg',2,'2024-07-09 22:01:13',2,'2024-07-09 22:01:13',0),(5,'yellow22222','小黃','$2a$10$3cRaR6rfXtASoxBp2xuPremVeCPX7oxbEVU1pkA0iuS4jcJCIfcli','0','0','yellow@gmail.com','0909620603','2',NULL,3,'2024-07-23 01:49:30',3,'2024-07-23 01:54:16',0),(6,'pink333333','小粉','$2a$10$2FubVemZKXx4lvd8Aaw9CurXsWEYllwEf2dqPWtbqGUooJSx0ZoqO','0','0','pink@gmail.com','0909620999','2',NULL,3,'2024-07-22 15:50:11',3,'2024-07-22 15:50:11',1),(7,'green44444','小綠','$2a$10$57fDIfFqs5iYGuXVrsbSceHF6ptePG7.F6XdGxxuFXycPpGx7ehq2','0','1','green@gmail.com','0909620888','0',NULL,3,'2024-07-22 15:58:08',3,'2024-07-22 15:58:08',0),(8,'tester2','測試員2','$2a$10$Wz0walrXmaWaotISomCCkONXgPixkpAct1BeyJS3bXE626MAZaseG','0','0','testjp46@gmail.com','0909620099','0',NULL,NULL,'2024-07-25 17:22:45',3,'2024-07-25 17:29:56',0);
/*!40000 ALTER TABLE `sys_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user_role`
--

DROP TABLE IF EXISTS `sys_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_user_role` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用戶-角色關聯表ID',
  `user_id` bigint NOT NULL COMMENT '用戶ID',
  `role_id` bigint NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `sys_user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`),
  CONSTRAINT `sys_user_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3 COMMENT='用戶角色關聯表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user_role`
--

LOCK TABLES `sys_user_role` WRITE;
/*!40000 ALTER TABLE `sys_user_role` DISABLE KEYS */;
INSERT INTO `sys_user_role` VALUES (1,1,1),(2,2,2),(4,4,2),(19,6,2),(20,6,3),(22,3,1),(25,5,3),(26,8,4);
/*!40000 ALTER TABLE `sys_user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-28 13:47:02
