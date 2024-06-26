--
-- Table structure for table `societies`
--

DROP TABLE IF EXISTS `societies`;
CREATE TABLE `societies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `societyName` varchar(96) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `societiesName_UNIQUE` (`societyName`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(32) DEFAULT NULL,
  `displayName` varchar(64) DEFAULT NULL,
  `hash` varchar(72) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`userName`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `event_posts`
--

DROP TABLE IF EXISTS `event_posts`;
CREATE TABLE `event_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(512) DEFAULT NULL,
  `location` varchar(64) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `eventType` varchar(32) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `societyId` int DEFAULT NULL,
  `eventTime` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `usersid_idx` (`userId`),
  KEY `societiesid_idx` (`societyId`),
  CONSTRAINT `societyid3` FOREIGN KEY (`societyId`) REFERENCES `societies` (`id`),
  CONSTRAINT `usersid` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `event_replies`
--

DROP TABLE IF EXISTS `event_replies`;
CREATE TABLE `event_replies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(512) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` int DEFAULT NULL,
  `postId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `eventpostid_idx` (`postId`),
  KEY `eventreplyuserid2_idx` (`userId`),
  CONSTRAINT `eventpostid` FOREIGN KEY (`postId`) REFERENCES `event_posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `eventreplyuserid2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(512) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `societyId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idposts_UNIQUE` (`id`),
  KEY `societies_idx` (`societyId`),
  KEY `user_idx` (`userId`),
  CONSTRAINT `societyid` FOREIGN KEY (`societyId`) REFERENCES `societies` (`id`),
  CONSTRAINT `userid` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `replies`
--

DROP TABLE IF EXISTS `replies`;
CREATE TABLE `replies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(512) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userid2_idx` (`userId`),
  KEY `postid2_idx` (`postId`),
  CONSTRAINT `postid2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `userid2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb3;


--
-- Table structure for table `user_likes_event_posts`
--

DROP TABLE IF EXISTS `user_likes_event_posts`;
CREATE TABLE `user_likes_event_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `eventPostId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`userId`),
  KEY `eventpost_id_idx` (`eventPostId`),
  CONSTRAINT `eventpost_id_like` FOREIGN KEY (`eventPostId`) REFERENCES `event_posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_id_event` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `user_likes_event_replies`
--

DROP TABLE IF EXISTS `user_likes_event_replies`;
CREATE TABLE `user_likes_event_replies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `eventReplyId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `eventreplyuserid_idx` (`userId`),
  KEY `eventreplyid_idx` (`eventReplyId`),
  CONSTRAINT `eventreplyid` FOREIGN KEY (`eventReplyId`) REFERENCES `event_replies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `eventreplyuserid` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `user_likes_posts`
--

DROP TABLE IF EXISTS `user_likes_posts`;
CREATE TABLE `user_likes_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `postId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`userId`),
  KEY `post_id_idx` (`postId`),
  CONSTRAINT `post_id` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_id` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `user_likes_replies`
--

DROP TABLE IF EXISTS `user_likes_replies`;
CREATE TABLE `user_likes_replies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `replyId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`userId`),
  KEY `reply_id_idx` (`replyId`),
  CONSTRAINT `reply_id_like` FOREIGN KEY (`replyId`) REFERENCES `replies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_id_reply` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `user_societies`
--

DROP TABLE IF EXISTS `user_societies`;
CREATE TABLE `user_societies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `societyId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userid3_idx` (`userId`),
  KEY `societyid2_idx` (`societyId`),
  CONSTRAINT `societyid2` FOREIGN KEY (`societyId`) REFERENCES `societies` (`id`),
  CONSTRAINT `userid3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb3;
