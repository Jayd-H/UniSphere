-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: unisphere.mysql.database.azure.com    Database: unisphere
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `event_posts`
--

DROP TABLE IF EXISTS `event_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(512) DEFAULT NULL,
  `location` varchar(64) NOT NULL,
  `timestamp` varchar(32) NOT NULL,
  `eventType` varchar(32) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `societyId` int DEFAULT NULL,
  `eventTime` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `usersid_idx` (`userId`),
  KEY `societiesid_idx` (`societyId`),
  CONSTRAINT `societyid3` FOREIGN KEY (`societyId`) REFERENCES `societies` (`id`),
  CONSTRAINT `usersid` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_posts`
--

LOCK TABLES `event_posts` WRITE;
/*!40000 ALTER TABLE `event_posts` DISABLE KEYS */;
INSERT INTO `event_posts` VALUES (1,'event post 1111','Asylum','20:44','Meeting',1,1,'20:00');
/*!40000 ALTER TABLE `event_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(512) NOT NULL,
  `timestamp` varchar(32) NOT NULL,
  `societyId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idposts_UNIQUE` (`id`),
  KEY `socioties_idx` (`societyId`),
  KEY `user_idx` (`userId`),
  CONSTRAINT `societyid` FOREIGN KEY (`societyId`) REFERENCES `societies` (`id`),
  CONSTRAINT `userid` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'first post woooooooooooooooooooo','21:58',1,44),(2,'lololololololololol','3:33',20,1),(3,'wewewewewewewewewewe','4:44',15,1);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `replies`
--

DROP TABLE IF EXISTS `replies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `replies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(512) NOT NULL,
  `timestamp` varchar(32) NOT NULL,
  `userId` int DEFAULT NULL,
  `postId` int DEFAULT NULL,
  `likeNum` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userid2_idx` (`userId`),
  KEY `postid2_idx` (`postId`),
  CONSTRAINT `postid2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`),
  CONSTRAINT `userid2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `replies`
--

LOCK TABLES `replies` WRITE;
/*!40000 ALTER TABLE `replies` DISABLE KEYS */;
/*!40000 ALTER TABLE `replies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `societies`
--

DROP TABLE IF EXISTS `societies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `societies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `societyName` varchar(96) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `sociotiesName_UNIQUE` (`societyName`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `societies`
--

LOCK TABLES `societies` WRITE;
/*!40000 ALTER TABLE `societies` DISABLE KEYS */;
INSERT INTO `societies` VALUES (1,'Pokémon Society','Calling all Pokemon enthusiasts! Our society is your one-stop shop for everything Pokemon.  Battle in tournaments, trade to expand your Pokedex, join nostalgic anime watch parties, and engage in lively discussions about strategies, lore, and your favorite creatures. Whether you\'re a seasoned veteran, a casual player, or just starting your journey, we welcome you to our community of passionate trainers.  Find fellow Pokemon lovers, share your knowledge, and discover the vast world of Pokemon together!','/images/PokemonSociety.jpg'),(2,'African-Caribbean Medical Society (HYMS)','The African-Caribbean Medical Society (HYMS) provides a dedicated space for aspiring medical professionals of African and Caribbean heritage. Our society offers mentorship, networking opportunities, academic support, career development resources, and a strong community focused on fostering your success throughout medical school and your professional journey.','/images/African-CaribbeanMedicalSociety(HYMS).jpg'),(3,'Afro-Caribbean Society','Embrace the vibrant spirit of Afro-Caribbean culture! Join our Afro-Caribbean Society for celebrations, discussions, educational events, and a welcoming community. Explore the rich traditions, music, food, and history of the African and Caribbean diaspora – all are welcome!','/images/Afro-CaribbeanSociety.jpg'),(4,'Ahlulbayt Society','The Ahlulbayt Society offers a space to explore the rich teachings of the Prophet\'s household within Islamic tradition. Join us for in-depth discussions, community events, volunteer opportunities, and a welcoming environment to delve into faith, history, and philosophy. All who are interested are encouraged to join our community!','/images/AhlulbaytSociety.jpg'),(5,'Anatomy Society (HYMS)','Dive deeper into the human body!  The Anatomy Society (HYMS) fosters your passion for anatomy through workshops, guest lectures, dissections (in some programs), and social events.  Join a community of students fascinated by the intricate workings of the human form. ','/images/AnatomySociety(HYMS).jpg'),(6,'Anime Society','Unleash your inner otaku! Join our Anime Society for screenings of classic and new favorites, in-depth discussions, cosplay gatherings, Japanese cultural events, and a whole lot of fun exploring the vibrant world of Japanese animation. Whether you\'re a seasoned fan or new to the scene, we welcome all anime enthusiasts!','/images/AnimeSociety.jpg'),(7,'Asian Culture Society','Explore the rich tapestry of Asian cultures! Join our Asian Culture Society for film screenings, discussions on traditions and history, food festivals, language exchange programs, and exciting events celebrating the diverse beauty of Asia. All are welcome - beginners and lifelong enthusiasts alike! ','/images/AsianCultureSociety.jpg'),(8,'Big Band Society','Love big band sounds? Join our Big Band Society! We bring the swing era to life with rehearsals, workshops, performances, and opportunities to develop your instrumental skills in a supportive community. All skill levels welcome, from beginners to seasoned musicians! ','/images/BigBandSociety.jpg'),(9,'Biological Sciences Society','Dissect the wonders of life! Join our Biological Sciences Society for guest lectures, lab demos, discussions on current research, and social events. Explore all areas of biology, from genetics to ecology, and connect with passionate peers. All majors welcome!','/images/BiologicalSciencesSociety.jpg'),(10,'Biomedical Science Society','Unravel the mysteries of health and disease!  Our Biomedical Science Society offers guest lectures, lab demos, discussions on cutting-edge research, and social events. Explore exciting fields from diagnostics to drug discovery, and connect with passionate peers. All majors welcome! ','/images/BiomedicalScienceSociety.jpg'),(11,'Board Games Society','Dive into the world of tabletop adventures! Join our Board Games Society for game nights, tournaments, strategy discussions, and a chance to explore a vast library of games. Whether you\'re a seasoned strategist or a curious newcomer, we welcome all to roll the dice and forge friendships!','/images/BoardGamesSociety.jpg'),(12,'Business School Society','Sharpen your business acumen! Join our Business School Society for workshops, guest speaker events, company visits, and networking opportunities. Develop your skills, connect with industry professionals, and gain valuable insights for your future career. All business school students welcome!','/images/BusinessSchoolSociety.jpg'),(13,'Cardiology Society (HYMS)','Calling future cardiologists! The HYMS Cardiology Society offers lectures from experts, workshops on practical skills, and opportunities to explore the fascinating world of the heart. Join our community to deepen your knowledge and connect with passionate peers. All HYMS students welcome!','/images/CardiologySociety(HYMS).jpg'),(14,'Cardiothoracic Surgery Society (HYMS)','Aspire to be a heart & lung surgeon? Join HYMS Cardiothoracic Surgery Society! We offer workshops on surgical techniques, lectures from specialists, and a supportive community to explore this exciting field. Develop your skills, network with mentors, and ignite your passion for cardiothoracic surgery. All HYMS students welcome!','/images/CardiothoracicSurgerySociety(HYMS).jpg'),(15,'Catholic Society','Deepen your faith! Join our Catholic Society for prayer groups, discussions on theology and current issues, social events, and opportunities to connect with fellow Catholics. All are welcome to explore and grow in their faith journey!','/images/CatholicSociety.jpg'),(16,'Chess Society','Sharpen your mind with strategy! Our Chess Society welcomes players of all levels for tournaments, casual games, workshops, and discussions.   hone your skills, learn new tactics, and connect with fellow chess enthusiasts. All are welcome - from beginners to grandmasters!','/images/ChessSociety.jpg'),(17,'Christian Union','Explore Christianity! Join our Christian Union for worship, thought-provoking discussions, social events, and opportunities to connect with fellow believers. Whether you\'re seeking faith, have questions, or simply want to learn more, you\'re welcome here!','/images/ChristianUnion.jpg'),(18,'CICC Ignite Society','Ignite your faith journey! CICC Ignite welcomes students of all backgrounds for fellowship, life-skill courses, mentorship, and social events. Explore Christianity, connect with others, and discover a supportive community!','/images/CICCIgniteSociety.jpg'),(19,'Communist Society','Fight for social change! Join our Communist Society and engage in discussions, workshops, and campaigns promoting social justice and economic equality. We explore socialist and communist ideologies in action. All activists welcome!','/images/CommunistSociety.jpg'),(20,'Computer Science Society','Level up your coding skills! Join our Computer Science Society for workshops, hackathons, guest lectures, and project collaborations. Whether you\'re a coding whiz or just starting out, explore the vast world of computer science and connect with passionate peers. All majors welcome!','/images/ComputerScienceSociety.jpg'),(21,'Conservative Association','Engage in lively political discussions! Join the Conservative Association for guest speakers, debates, film screenings, and discussions on current events from a conservative perspective. We welcome all viewpoints for open and respectful dialogue.','/images/ConservativeAssociation.jpg'),(22,'Creative Writing Society','Unleash your inner author! Join our Creative Writing Society for workshops, readings, critiques, and a supportive community. Explore all genres, hone your craft, and connect with fellow writers. All levels welcome, from beginners to budding novelists!','/images/CreativeWritingSociety.jpg'),(23,'Crochet and Knit Society','Craft your creativity! Join our Crochet & Knit Society for cozy get-togethers, skill-share workshops, exciting projects, and a warm community. Beginners & veterans welcome - stitch up some fun and make new friends!','/images/CrochetandKnitSociety.jpg'),(24,'Crystal Clear Society','Our aim at Crystal Clear is to provide a safe and inclusive space for students, where dance musicfrom the UK and around the world can explored and celebrated.','/images/CrystalClearSociety.jpg'),(25,'Disney and Pixar Society','Disney and Pixar society offers everyone the chance to talk and enjoy all things Disney! Whether it be discussing your favourite Disney film, Marvel character, sharing trivia knowledge or debating the best Star Wars film this society is for you! We often meet on a Thursday night, and host movie nights, games nights, quiz nights as well as joint socials with other societies for some friendly competition.','/images/DisneyandPixarSociety.jpg'),(26,'Doctor Who Society','A society where we come together and have calm discussions about Doctor Who. Whether you are a long time fan of the show or are looking to be interested in it starting with the new era, you\'re welcome to come along and enjoy some nice Doctor Who themed fun.','/images/DoctorWhoSociety.jpg'),(27,'Drama Society','Hull University Drama Society is one of the University\'s most active societies. Every year we put on four full-scale productions, providing opportunities for actors, directors, and technical operators. We\'ve put on comedies such as The Ladykillers, The 39 Steps, and even a stage adaptation of Blackadder goes Fourth, but we have also delved into the macabre with shows like The Hollow, The Pillowman, and Macbeth.','/images/DramaSociety.jpg'),(28,'Education Society','The Education Society strives to bring together students from across the university who are interested in working with children. This may appeal most to students on education based programmes, but with regular fun activities and socials planned this society is perfect for meeting new people, enjoying yourself, and maybe even learning something new.','/images/EducationSociety.jpg'),(29,'Enactus','Enactus is a student-led organisation that employs social action to better the lives of the community through volunteering. We encourage change and maintain connectivity through making friends and meeting like-minded people who wish to inspire.','/images/Enactus.jpg'),(30,'Engineering Society','We are a group of engineering students across different years of education who are interested in providing a community for engineering students to engage with each other. We will host a range of events to provide a good balance of social events and an inclusive learning environment. We will  also provide learning opportunities and networking events to go alongside your academic responsibilities.  ','/images/EngineeringSociety.jpg'),(31,'English Society','Hull University English Society is a welcoming, safe and inclusive group for students with a passion for the English language, literature, or creative writing of all forms. With us, you can meet like-minded individuals and become part of the University’s literary community. You do not need to be studying English or anything similar in order to join us - everyone is welcome!','/images/EnglishSociety.jpeg'),(32,'Forensic and True Crime Society','The Forensic and True Crime Society is a place for students who either study forensics or have an interest in forensics or true crime to come together. ','/images/ForensicandTrueCrimeSociety.jpg'),(33,'Friends of MSF Hull Society (HYMS)','Join Forces with Doctors Without Borders! The Friends of MSF Hull Society (HYMS) supports the lifesaving work of Médecins Sans Frontières.  Engage in fundraising, awareness campaigns, discussions on humanitarian action, and connect with a community dedicated to global health. All HYMS students welcome!','/images/FriendsofMSFHullSociety(HYMS).jpg'),(34,'Friends of Palestine Society','Friends of Palestine Society welcome all students to join us. Our Society aims to spread awareness of the rich culture, traditions, and Palestinian history and places. Through educational and social events, we wish to promote a healthy environment and interactive discussion between people from all walks of life.','/images/FriendsofPalestineSociety.jpg'),(35,'Gaming Society','Welcome to the Hull University Union Gaming Society (H.U.U.G.S)! This is your go-to society for all things gaming at Hull University. Whether you are a fan of your single-player experiences, co-operative adventures, pulled by the competitive environment or only just enjoy the odd party game - your welcome to bring all those and experience more here!','/images/GamingSociety.jpg'),(36,'Geography Society','Explore the world! Join our Geography Society for expeditions, guest lectures on diverse cultures, discussions on environmental issues, mapmaking workshops, and social events. Whether you\'re fascinated by physical geography or human geography, all are welcome to embark on an adventure!','/images/GeographySociety.jpg'),(37,'Geriatric Society (HYMS)','According to the 2021 census 18.6% of the UK population was over the age of 65, that is 11+ million people and our population is only getting older. Our hope when founding HYMS Gerisoc this year was to inspire our medical student colleagues to become interested and informed about specialty that spans all corners of medicine. There is little formal geriatrics teaching in the undergraduate medical curriculum and huge disparities across the country.','/images/GeriatricSociety(HYMS).jpeg'),(38,'Ghanaian Society','Embrace Ghanaian culture! Join our Ghanaian Society for celebrations, discussions on traditions and current events, delicious food, and a vibrant community.  Whether you\'re Ghanaian, interested in exploring West African culture, or simply curious, all are welcome!','/images/GhanaianSociety.jpg'),(39,'GP Society (HYMS)','Welcome to HYMS GP Society! We\'re a society that aims to provide educational and interesting talks on a variety of topics and provide a better insight into a career in primary care. Whether you\'re set on becoming a GP or just want to attend our events, GPSoc hopes to provide something for everyone!','/images/GPSociety(HYMS).jpg'),(40,'Havilah Gospel Choir Society','Havilah Gospel Choir is a Christian performing arts collective that welcomes people of diverse backgrounds and different vocal and instrumental abilities. Just like the name Havilah, we intend to uncover the hidden gems each person carries in their musical ability in a fun environment. It\'s a new, creative way for people to learn more about Christ.','/images/HavilahGospelChoirSociety.jpg'),(41,'History Society','Are you interested in History? Do you want to meet with people to talk about your interest in History? Do you love books, guest lectures and weekly socials with like-minded people? Then the History Society wants YOU!','/images/HistorySociety.jpg'),(42,'Horror Society','Hull Horror Society is a community of avid fans dedicated to the watching, reading, and discussing of horror media. Whether you\'re a Stephen King fanatic, a slasher enthusiast, or you just want to discover something new and a bit scary, you are welcome here. Our socials are a weekly screening each Wednesday at 7pm, as well as trips to new releases, quizzes, and conventions. Keep an eye on our socials for regular updates. ','/images/HorrorSociety.jpg'),(43,'Hullfire Newspaper','The Hullfire is the free, official student publication of Hull University Students\' Union. Written and edited by students, for students, any University of Hull student can get involved and contribute, all you have to do is get in touch!','/images/HullfireNewspaper.jpg'),(44,'Indian Society','Celebrate the richness of India! Join our Indian Society for cultural festivals, dance performances, Bollywood movie nights, discussions on history and current affairs, and a taste of authentic Indian cuisine. All are welcome to discover the vibrant spirit of India!','/images/IndianSociety.jpg'),(45,'Islamic Society','Assalamu Alaikum Wa Rahmatullahi Wa Barakatuhu, Whether you\'re a new student at the university or an existing one, the University of Hull Islamic Society (ISOC) offers you a sense of community, support and guidance where it\'s needed.','/images/IslamicSociety.jpg'),(46,'JAM Radio','After extensive refurbishment and investment in equipment in partnership with alumni Broadcast Radio, JAM Radio is back and bigger than ever!','/images/JAMRadio.jpg'),(47,'Labour Club Society','The Hull University Labour Club (HULC).This year will be a big year for the Labour Club. Join for trips, socials and major guest speakers! HULC has a great history, founded in 1952, with alumni including Lord John Prescott, former Deputy Prime Minister Lord Roy Hattersley, Deputy Speaker Rosie Winterton, Tom Watson MP, Karl Turner MP and many other Councillors and political figures.','/images/LabourClubSociety.jpg'),(48,'Law Society','The University of Hull Law Society is a vibrant and inclusive community for law students seeking to enhance their legal education and social connections. At the heart of our society, we prioritize the development of essential skills through various competitions, offering our members invaluable experiences that will prepare them for a successful legal career.','/images/LawSociety.jpg'),(49,'Liberal Democrats','The Liberal Democrats are a liberal political party in the United Kingdom, founded in 1988. Since the 1992 general election, with the exception of the 2015 general election, they have been the third-largest UK political party by the number of votes cast.','/images/LiberalDemocrats.jpg'),(50,'LINKS','Hull LINKS is a first aid teaching society, as well as an operational unit of St John Ambulance, run by students for students. We provide free first aid teaching to our members covering all areas of first aid from bandaging wounds to mental health first aid awareness.','/images/LINKS.jpg'),(51,'Malaysian Student Association Society','Discover a piece of home abroad! Join our Malaysian Student Society for vibrant cultural celebrations, delicious traditional food events, social gatherings, and a supportive community network. Celebrate Hari Raya, Chinese New Year, Deepavali, and more with fellow Malaysians. Find support, friendship, and a taste of home while you explore your new surroundings!','/images/MalaysianStudentAssociationSociety.jpg'),(52,'Mathematics Society','Unlock the beauty of numbers! Join our Mathematics Society and dive into the fascinating world of mathematics.  Whether you\'re a seasoned math whiz or simply curious, we offer a welcoming space for everyone to explore this incredible field.','/images/MathematicsSociety.jpg'),(53,'MedSoc (HYMS)','MedSoc is the primary society for all individuals studying at the Hull York Medical School (HYMS) and membership is available to all Hull University students. We are the governing body for the majority of other medically based societies at Hull University such as Teddy Bear Hospital, Friends of MSF, Sexpression and the Wilderness Medicine Society.','/images/MedSoc(HYMS).jpg'),(54,'Midwifery Society','A society for those studying midwifery and those interested in midwifery as a career. We run social events to unify the cohorts alongside anybody else with interest in pregnancy and birth. We organise study days and extra curricular learning that may interest our members and provide a safe and supportive atmosphere in which to enjoy our events. ','/images/MidwiferySociety.jpg'),(55,'Music Society','Hull University Music Society (HUMS) aims to allow students from all departments of the university to come together with a love of music as a mutual interest. Our society welcomes musicians and music lovers alike with opportunities to play in concerts or to just appreciate listening and experiencing music.','/images/MusicSociety.jpg'),(56,'Nigerian Society','This society was founded with the sole aim of providing an enabling platform for Nigeria students at the University of Hull to flourish and achieve academic excellence. We hope to achieve this by building a strong and useful network for Nigeria students, one that you can explore while here at University of Hull and beyond.','/images/NigerianSociety.jpg'),(57,'Nursing Society','The aim of the nursing society is to connect all nursing students from all programmes and cohorts to create an interdisciplinary community of support for the future nurses.','/images/NursingSociety.jpg'),(58,'Obstetrics and Gynaecology Society (HYMS)','Delve into the extraordinary world of women\'s health! Join the Obstetrics and Gynecology Society (HYMS) for hands-on workshops, insightful talks from leading OB/GYN specialists, and career development opportunities within this fascinating field.','/images/ObstetricsandGynaecologySociety(HYMS).jpg'),(59,'Paediatric Society (HYMS)','Unlock the wonders of child health! Join the Paediatric Society (HYMS) and explore the dynamic world of caring for children. We offer engaging activities, insightful lectures, and a passionate community for anyone interested in paediatrics.','/images/PaediatricSociety(HYMS).jpg'),(60,'Pakistan Society','Experience the Culture of Pakistan Have lots of fun and opportunity to make lots of friends. We are a bunch of friendly and welcoming people, here to make your University life experience enjoyable and fun.','/images/PakistanSociety.jpg'),(61,'Palpate Society (HYMS)','Welcome to HYMS Palpate, the medical society for all your revision needs. We provide student-led teaching sessions on ALS and Clinical Skills content for years 1-4 at Hull York Medical School. Our sessions run weekly and are taught by our very own students so you can get an insight into the essential areas for each topic.','/images/PalpateSociety(HYMS).jpg'),(62,'Pan African Society','The Pan African Society provides the platform for students to socialise, debate, and share ideas on issues surrounding African unity in a global context. The Society is open to students from all backgrounds interested in any of African history, politics, literature, and arts.','/images/PanAfricanSociety.jpg'),(63,'Paramedic Society','As an academic society, we are looking to provide an insight into the paramedic profession and help as many students as possible learn new skills and knowledge! Whether it\'s guest speakers, practical events or socials, we\'re sure that there will be something for everyone! ','/images/ParamedicSociety.jpg'),(64,'PENSA Hull Society','PENSA (Pentecost students and Associates) is a Christian society that seek to help students maintain deeper, personal relationships with God in a refreshing and unique environment. We encourage ambitions in students to develop both their personal and professional career goals through our academic yet faith oriented weekly sessions & activities.','/images/PENSAHullSociety.jpg'),(65,'Performing Arts Society','HUU Awards Society of the Year 2018, 2013, HUU Gold Award 2013, 2014, 2015 & HUU Performance Society 2022. Do you enjoy musical theatre? Maybe singing is your passion, dance your forté, or maybe you\'re a budding actor? Perhaps you want to be in the band for our shows, or have a passion for set design or stage management? Or maybe you just love theatre!','/images/PerformingArtsSociety.jpg'),(66,'Philosophy Society','We are a society that seeks to bring together all students with an interest in philosophy, regardless of what subject they study. We host a large variety of events including reading circles, film screenings, debates, and guest talks, as well as more casual socials such as toga parties and pub crawls.','/images/PhilosophySociety.jpg'),(67,'Physician Associate Society (HYMS)','Our society was formed in early 2017 with the vision to bring a sustainable future of professional development for HYMS Physician Associate Students past, present, and future. Since its inception, the student-led HYMS PASoc has been keen to demonstrate that Physician Associates are an asset not only to the medical school, but to the wider community through the organization of charitable, educational, and social events.','/images/PhysicianAssociateSociety(HYMS).jpg'),(68,'Physics Society','We host a varied schedule of physics and non-physics-based activities and socials. We host movie nights and stargazing socials, along with off-campus socials on occasion. During the summer months, we plan physics based trips to other departments and companies in the country and abroad where possible.','/images/PhysicsSociety.jpg'),(69,'Plant Society','The Hull University Plant Society is welcome to everyone, whether you’re a complete beginner, or an experienced gardener, we are a friendly group of students who share a love of plants and nature. It doesn’t matter if you can’t seem to keep a plant alive or your room is a jungle. Every student is welcome.','/images/PlantSociety.jpg'),(70,'Plastic, Reconstructive and Aesthetic Surgery Society (PRAS) (HYMS)','HYMS PRAS prides ourselves in being the true connection between career building opportunities in plastic surgery locally and the HYMS community. As a medical student, navigating an extremely demanding course alongside dedicating a substantial amount of time to finding and pursuing opportunities to kickstart one’s career in plastic surgery is a truly demanding task.','/images/PlasticReconstructiveandAestheticSurgerySociety(PRAS)(HYMS).jpg'),(71,'Politics Society','Hull University Politics Society is for any student that is interested in politics, whether they be studying it or not. Joining the society will give you an opportunity to connect with people in an informal environment, to discuss politics, as well as the chance to debate in a more formal setting.','/images/PoliticsSociety.jpg'),(72,'Psychiatry Society (HYMS)','Our society offers a range of events to students who are interested in psychiatry and mental health in general. ','/images/PsychiatrySociety(HYMS).jpg'),(73,'Psychology Society','Welcome to the Psychology society. Our goals are to Educate, Inform, and Inspire our members. We do this by providing guest speakers from different areas of psychology, providing socials where we can all get to know each other, arranging tea and chats so members can ask questions about where to go or who to ask, arranging larger scale events where staff and students can mingle, and of course by our hugely popular brain dissection.','/images/PsychologySociety.jpg'),(74,'Radiology Society (HYMS)','The main goal of RadSoc is to promote an understanding and appreciation of Radiology. There is currently a lack of Radiology representation in medical schools, with students often reporting limited exposure, especially when compared to other specialties. ','/images/RadiologySociety(HYMS).jpg'),(75,'Robotics Society','The University of Hull Robotics Society is back for another year!! We design, 3D print, build, and program robots within many sectors. From looking at humaniod robots to small ardiuno projects. We aim to provide fun interactive sessions for those with an intrest in tech and robotics so they can get hands on robotic skills. ','/images/RoboticsSociety.jpg'),(76,'Rock Society','Rock Society is an opportunity for people who enjoy alternative music and subcultures to meet each other and discover new events.','/images/RockSociety.jpg'),(77,'Rooted in Christ Society','We are a group of Christians on campus that meet together to support and encourage each other and share our faith. We will be running events throughout the year so feel free to get involved.','/images/RootedinChristSociety.jpg'),(78,'Self Improvement Society (HYMS)','We are a society focused on encouraging and empowering students to protect their physical, mental, and spiritual wellbeing. We do this by developing positive habits together which contribute towards long-term health.','/images/SelfImprovementSociety(HYMS).jpg'),(79,'Sports and Exercise Medicine Society (HYMS)','Welcome to the HYMS Sports & Exercise Medicine society! We are a society that aims to help provide insight to students surrounding the field of sports and exercise medicine. We will be holding interesting talks from those who are already in the profession as well as educating students on different problems and injuries that are associated with this field.','/images/SportsandExerciseMedicineSociety(HYMS).jpg'),(80,'Sports Rehabilitation Society','Hull University Sport Rehabilitation Society, is a supportive society, enabling students on the course to find new friends within all year groups, currently studying the course. We can also offer advice and guidance on exams, work placement and anything else you may want to discuss.','/images/SportsRehabilitationSociety.jpg'),(81,'Students for Global Health Hull Society (HYMS)','Students for global health HYMS is part of a national organisation and charity. This society aims to create a network of students empowered to affect, tangible, social and political change in health or a local, national and global level through education, advocacy, and community action.','/images/StudentsforGlobalHealthHullSociety(HYMS).jpg'),(82,'Taylor Swift Society','The Taylor Swift society is one of the university\'s more niche society\'s. It is dedicated to celebrating the incredibly talented and successful musician that is Taylor Swift! We welcome anyone who has an interest in Taylor, whether they are a lifelong Swiftie or just discovering her music. Although Swifite Soc is new, we aim to put on lots of events that are fun and hope to create a safe and enjoyable space for everyone at the university!','/images/TaylorSwiftSociety.jpg'),(83,'The Sound of Musicals Society','The Sound of Musicals society provides a laid-back environment for those who love musicals. No need to perform, we are just about the watching and discussion of them. We will also see an in person musical performance at local theaters when possible.','/images/TheSoundofMusicalsSociety.jpg'),(84,'Torch TV','Join our award winning TV station! If you have loads of experience or have never picked up a camera before, Torch TV student television offer a range of opportunities in directing, production, camera, sound, editing, acting and loads more.','/images/TorchTV.jpg'),(85,'Trauma and Orthopaedics Society (HYMS)','HYMS Trauma & Orthopaedic Society is a central hub for those interested in the field who want to explore career options, gain new knowledge and experience, and develop their portfolio so that they can be prepared for future applications and opportunities.','/images/TraumaandOrthopaedicsSociety(HYMS).jpg'),(86,'Wargames and Roleplay Society (WARPS)','We are the Hull University Wargames and Roleplay Society (WARPS). We meet every Wednesday in the Wilberforce Building from 2pm to game until 9PM. We play all kinds of games, from Pathfinder, D&D, Dark Heresy, World of Darkness and Warhammer through to Warhammer 40k, Magic The Gathering and more.','/images/WargamesandRoleplaySociety(WARPS).jpg'),(87,'Women + in STEM Society','We are a society that aims to support female, non-binary and lgbtq+ identifying individuals studying or working in STEM-fields. We plan to host regular events (such as coffee mornings, talks from women & non-binary people in industry) and keep active on social media in order to build a support network for individuals in this sector.','/images/Women+inSTEMSociety.jpg'),(88,'Yoga Society','Discover the transformative journey to well-being with the Yoga Society! Immerse yourself in a vibrant community dedicated to yoga. Our society is your haven for exploration, offering a range of different styles of classes led by experienced instructors passionate about guiding you through the relaxing benefits of yoga. Whether you are a beginner taking your first step onto the mat or an advanced practitioner seeking new dimensions in your practice, our diverse offerings cater to all levels.','/images/YogaSociety.jpg');
/*!40000 ALTER TABLE `societies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_likes_event_posts`
--

DROP TABLE IF EXISTS `user_likes_event_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_likes_event_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `eventPostId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`userId`),
  KEY `eventpost_id_idx` (`eventPostId`),
  CONSTRAINT `eventpost_id_like` FOREIGN KEY (`eventPostId`) REFERENCES `event_posts` (`id`),
  CONSTRAINT `user_id_event` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_likes_event_posts`
--

LOCK TABLES `user_likes_event_posts` WRITE;
/*!40000 ALTER TABLE `user_likes_event_posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_likes_event_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_likes_posts`
--

DROP TABLE IF EXISTS `user_likes_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_likes_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `postId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`userId`),
  KEY `post_id_idx` (`postId`),
  CONSTRAINT `post_id` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`),
  CONSTRAINT `user_id` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_likes_posts`
--

LOCK TABLES `user_likes_posts` WRITE;
/*!40000 ALTER TABLE `user_likes_posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_likes_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_likes_replies`
--

DROP TABLE IF EXISTS `user_likes_replies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_likes_replies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `replyId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`userId`),
  KEY `reply_id_idx` (`replyId`),
  CONSTRAINT `reply_id_like` FOREIGN KEY (`replyId`) REFERENCES `replies` (`id`),
  CONSTRAINT `user_id_reply` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_likes_replies`
--

LOCK TABLES `user_likes_replies` WRITE;
/*!40000 ALTER TABLE `user_likes_replies` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_likes_replies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_societies`
--

DROP TABLE IF EXISTS `user_societies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_societies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `societyId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userid3_idx` (`userId`),
  KEY `societyid2_idx` (`societyId`),
  CONSTRAINT `societyid2` FOREIGN KEY (`societyId`) REFERENCES `societies` (`id`),
  CONSTRAINT `userid3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_societies`
--

LOCK TABLES `user_societies` WRITE;
/*!40000 ALTER TABLE `user_societies` DISABLE KEYS */;
INSERT INTO `user_societies` VALUES (1,1,1),(2,1,20);
/*!40000 ALTER TABLE `user_societies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(32) DEFAULT NULL,
  `displayName` varchar(64) DEFAULT NULL,
  `hash` varchar(72) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`userName`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'jaydchw','Jayden Holdsworth','$2b$10$bUXEcDC8E0Ao/z1NDViESedKfL8DBK/1.xicwJ71nAvU0LwbFC3OO'),(2,'ellieseal','Ellie Seal','$2b$10$iN4umiGM3xuQg/YbhdBTCes8rbN35poCNqLu0sP5eDaRCZL/eHD8y'),(10,'testt','testt','$2b$10$XJis/IQTE.U63aZo./dmueLVhl.FQMpEafDFXHEoDYaYcc1/kgVaq'),(11,'superman','Super Man','$2b$10$O4/ENVxNFeXv4uGUyZNNneHlsUWhsQLf6EtQ3MwqzM4KCU6aPHv.y'),(13,'aaaaa','aaaaa','$2b$10$LSwpaeIzDjVSZxavJ.jATOViDDxTSAmKDfwIRzmXv65co0/CwI2CG'),(14,'test3','test3','$2b$10$GxVHyU4D3QF67HsDcEyp4.MEslcXlxYS/EB5aXY2yQBNsobzgPthW'),(16,'test2','test3','$2b$10$oOYfzftwIsEl/jMRotKHb.beCiQJJEkPKwAZSExRZexz8B9UBeD.q'),(17,'test1','test1','$2b$10$jb2Gf37zoAfa6op38p.5LOy7ZwqdQDLZWwAcJ6ePswIFaUdz5TnPu'),(18,'blaaa','blaaa','$2b$10$mFoI9IYMNnoMMEK/j7rGreFgIgskUz1dX9uW.6L/bdNsbN1/XqJDi'),(20,'testtt','test1','$2b$10$FvkNeRxH/876i8hPbbACkuuyHVX63cSLyT2wrqGl6LwhFPdegIbvG'),(24,'jayden1','aaaaa','$2b$10$dOpFrRzER2ymZmJTmmdAE.p0SPi/KO6vaka1s/dD2SsiY9/cyVFqu'),(28,'elliesqueal','Ellie Seal','$2b$10$DoBH.QnMXPHn7MitpcK5YOJ8R7X6oQwjxIDNj6CynxH67noat73qy'),(29,'Samuel','SamChubley','$2b$10$h.C5Le4/woRYpnDoUvGip.vf/GbrWnTz.ZnKI.NkakE6i.meVI/3e'),(30,'BongoBingo','PipelinePunch','$2b$10$X7e0wss2E0VqcvvHxb8p5Of6ZO7oxwo7JoZJVzBDx3u5zxRiJpdde'),(32,'test4','test4','$2b$10$cZOgf7jF/LWVB292xvCgUODyfxDR.XZNy0votyKq/3H2DyKAwS6T6'),(34,'jaydenholds','Jayden Holds','$2b$10$oSLMVI6PaCHy.KJlMLTpuu1v35Bq7cGzB0FD7uIEY37JD.jOIIO3W'),(35,'GoblinMan','GoblinMan','$2b$10$3IRaidOnVGFGDeVOblQI7uU9Fr0PFHYzS9aQx7jPVyyhDH1DY11M.'),(36,'BurgerGuy','BurgerMan','$2b$10$XPfjut7maxzfJ0YqqwvdCutxNNsNWScZBYtcoO2s8zP6Jqvsk1Nbe'),(37,'jaredfromsubway','Jared','$2b$10$QIhZiqUyo21HkB2fZ1wpqub/Gljc48coxA7eYJxf2J9FeyU2GpeNm'),(38,'ewqeqweq','weqweqwwqeqwe','$2b$10$qokLda2rJ91SUC9q6413su0itnSWCVx4jHatKvkmoS6GA4PNgGFP.'),(39,'yo_this_backend_is_fucking_sick','backend_moment','$2b$10$UTg8Km5TE1raQwfYxLwNveK6EsICfoA86SxdVpIyEBZNBwSCrrIlS'),(40,'tester','tester','$2b$10$Ncrp71kYQHoVduEDoenVG.ot7VU/ICpQtaYuyeJQORLdve/BfrCSe'),(41,'testttt','testtt','$2b$10$pmCHMnaKRs/mhN4Tj0Hdz.Scsy.S2qRw04ZC.HV.g7f82eT6f4F72'),(42,'fffff','fffff','$2b$10$HahFhsDCDLlyHTNaUibLJOcRKfUR78tR1/cpeMdBcRH1gel7aPXOC'),(43,'qqqqq','qqqqq','$2b$10$6zTwYw.rq1MVmc7wXOoBEuKaTCUKPhpH/ZpFyc9pvT/2MPUIjLzT.'),(44,'Jimmybob','TangoMango','$2b$10$7cHI/9KEfVyrYTek2HMPB.Sb7pB4ggK.0Lyb53Hroyy6IaNLs7As.'),(45,'testyguy','testyman','$2b$10$d1nVDbDfX96X.d/pDSVeZOVgndAuTbo5oEZn1TyESSs7Bj//4iyNu'),(46,'obama','TangoMango','$2b$10$kGvNA0766RXSYkOf/YY6SuaBVTjzT3FB1Uh9JOMpavnVRPBw78zje'),(47,'jaychw','aaaaaa','$2b$10$P/Ci.7SCfnQjaR7jy5c6MuvkPJF/IEW1IdNrSnuvv5y.UGKnaTxrC'),(48,'aaaaaa','aaaaa','$2b$10$WJafMV4ANq3Dg/LFOiLqk.SrL48hv9bWcvCCC.IoEsreOvAP8.3tG'),(49,'hugehuman','Huge Guy','$2b$10$z5F3cBQkQzL.PIgTwcjYuOx.ie1Q9nUq9FOBbqrnuGEegOrGdt84K');
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

-- Dump completed on 2024-03-31  9:08:37
