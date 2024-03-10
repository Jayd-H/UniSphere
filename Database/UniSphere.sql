CREATE DATABASE  IF NOT EXISTS `unisphere`;
USE `unisphere`;

--
-- Table structure for table `eventposts`
--

DROP TABLE IF EXISTS `eventposts`;
CREATE TABLE `eventposts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `eventPost` varchar(512) NOT NULL,
  `location` varchar(64) NOT NULL,
  `timestamp` varchar(32) NOT NULL,
  `eventType` varchar(32) NOT NULL,
  `userid` int NOT NULL,
  `societyid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `usersid_idx` (`userid`),
  KEY `societiesid_idx` (`societyid`),
  CONSTRAINT `societyid3` FOREIGN KEY (`societyid`) REFERENCES `societies` (`id`),
  CONSTRAINT `usersid` FOREIGN KEY (`userid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(512) NOT NULL,
  `timestamp` varchar(32) NOT NULL,
  `societyId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idposts_UNIQUE` (`id`),
  KEY `socioties_idx` (`societyId`),
  KEY `user_idx` (`userId`),
  CONSTRAINT `societyid` FOREIGN KEY (`societyId`) REFERENCES `societies` (`id`),
  CONSTRAINT `userid` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `replies`
--

DROP TABLE IF EXISTS `replies`;
CREATE TABLE `replies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(512) NOT NULL,
  `timestamp` varchar(32) NOT NULL,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userid2_idx` (`userId`),
  KEY `postid2_idx` (`postId`),
  CONSTRAINT `postid2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`),
  CONSTRAINT `userid2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `societies`
--

DROP TABLE IF EXISTS `societies`;
CREATE TABLE `societies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `societiesName` varchar(32) NOT NULL,
  `Description` varchar(256) NOT NULL,
  `BannerImg` mediumblob,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `sociotiesName_UNIQUE` (`societiesName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `displayName` varchar(64) NOT NULL,
  `hash` varchar(72) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `usersocieties`
--

DROP TABLE IF EXISTS `usersocieties`;
CREATE TABLE `usersocieties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `societyid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userid3_idx` (`userid`),
  KEY `societyid2_idx` (`societyid`),
  CONSTRAINT `societyid2` FOREIGN KEY (`societyid`) REFERENCES `societies` (`id`),
  CONSTRAINT `userid3` FOREIGN KEY (`userid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
