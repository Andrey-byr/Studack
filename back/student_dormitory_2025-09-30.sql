# ************************************************************
# Sequel Ace SQL dump
# Версия 20095
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Хост: 127.0.0.1 (MySQL 9.4.0)
# База данных: student_dormitory
# Время формирования: 2025-09-30 08:40:40 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Дамп таблицы dormitories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dormitories`;

CREATE TABLE `dormitories` (
  `dormitory_id` int NOT NULL AUTO_INCREMENT,
  `building_count` int NOT NULL,
  `address` varchar(255) NOT NULL,
  `dormitory_type` varchar(100) NOT NULL,
  `total_capacity` int NOT NULL,
  PRIMARY KEY (`dormitory_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `dormitories` WRITE;
/*!40000 ALTER TABLE `dormitories` DISABLE KEYS */;

INSERT INTO `dormitories` (`dormitory_id`, `building_count`, `address`, `dormitory_type`, `total_capacity`)
VALUES
	(1,3,'ул. Студенческая, д. 15','блочного типа',300);

/*!40000 ALTER TABLE `dormitories` ENABLE KEYS */;
UNLOCK TABLES;


# Дамп таблицы students
# ------------------------------------------------------------

DROP TABLE IF EXISTS `students`;

CREATE TABLE `students` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `average_grade` decimal(3,2) DEFAULT NULL,
  `has_public_work` tinyint(1) DEFAULT '0',
  `family_income_per_member` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;

INSERT INTO `students` (`student_id`, `full_name`, `date_of_birth`, `phone_number`, `average_grade`, `has_public_work`, `family_income_per_member`)
VALUES
	(1,'Иванов Иван Иванович','2000-05-15','+79991234567',4.50,1,25000.00);

/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;


# Дамп таблицы rooms
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rooms`;

CREATE TABLE `rooms` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `dormitory_id` int NOT NULL,
  `building_number` int NOT NULL,
  `floor` int NOT NULL,
  `capacity` int NOT NULL,
  PRIMARY KEY (`room_id`),
  KEY `dormitory_id` (`dormitory_id`),
  CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`dormitory_id`) REFERENCES `dormitories` (`dormitory_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;

INSERT INTO `rooms` (`room_id`, `dormitory_id`, `building_number`, `floor`, `capacity`)
VALUES
	(1,1,1,3,2);

/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;


# Дамп таблицы applications
# ------------------------------------------------------------

DROP TABLE IF EXISTS `applications`;

CREATE TABLE `applications` (
  `application_id` int NOT NULL AUTO_INCREMENT,
  `application_date` date NOT NULL,
  `desired_dormitory_type` varchar(100) NOT NULL,
  `student_id` int NOT NULL,
  PRIMARY KEY (`application_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;

INSERT INTO `applications` (`application_id`, `application_date`, `desired_dormitory_type`, `student_id`)
VALUES
	(1,'2025-09-01','блочного типа',1);

/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;


# Дамп таблицы residence
# ------------------------------------------------------------

DROP TABLE IF EXISTS `residence`;

CREATE TABLE `residence` (
  `residence_id` int NOT NULL AUTO_INCREMENT,
  `check_in_date` date NOT NULL,
  `check_out_date` date DEFAULT NULL,
  `student_id` int NOT NULL,
  `room_id` int NOT NULL,
  PRIMARY KEY (`residence_id`),
  KEY `student_id` (`student_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `residence_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  CONSTRAINT `residence_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `residence` WRITE;
/*!40000 ALTER TABLE `residence` DISABLE KEYS */;

INSERT INTO `residence` (`residence_id`, `check_in_date`, `check_out_date`, `student_id`, `room_id`)
VALUES
	(1,'2025-09-02',NULL,1,1);

/*!40000 ALTER TABLE `residence` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;