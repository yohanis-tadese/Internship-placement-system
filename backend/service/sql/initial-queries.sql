-- Departments Table
CREATE TABLE IF NOT EXISTS `departments` (
  `department_id` int(11) NOT NULL AUTO_INCREMENT,
  `department_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL UNIQUE,
  `phone_number` varchar(20),
  `contact_email` varchar(255),
  `office_location` varchar(255),
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`department_id`),
  UNIQUE KEY (`department_name`),
  INDEX (`department_name`)
) ENGINE=InnoDB;-- Departments Table


CREATE TABLE IF NOT EXISTS `departments` (
  `department_id` int(11) NOT NULL AUTO_INCREMENT,
  `department_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL UNIQUE,
  `phone_number` varchar(20),
  `contact_email` varchar(255),
  `office_location` varchar(255),
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`department_id`),
  UNIQUE KEY (`department_name`),
  INDEX (`department_name`)
) ENGINE=InnoDB;

-- Companies Table
CREATE TABLE IF NOT EXISTS `companies` (
  `company_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL UNIQUE,
  `phone_number` varchar(20),
  `contact_email` varchar(255),
  `location` varchar(255),
  `industry_sector` varchar(255),
  `accepted_student_limit` int(11),
  `website` varchar(400),
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`company_id`),
  UNIQUE KEY (`company_name`)
) ENGINE=InnoDB;

-- Students Table
CREATE TABLE IF NOT EXISTS `students` (
  `student_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `username` varchar(255) NOT NULL UNIQUE,
  `phone_number` varchar(20),
  `contact_email` varchar(255),
  `password` varchar(255) NOT NULL,
  `department_id` int(11),
  PRIMARY KEY (`student_id`),
  FOREIGN KEY (`department_id`) REFERENCES `departments`(`department_id`) ON DELETE CASCADE 
) ENGINE=InnoDB;

-- Admins Table
CREATE TABLE IF NOT EXISTS `admins` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `username` varchar(255) NOT NULL UNIQUE,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB;

-- Insert random departments
INSERT INTO `departments` (`department_name`, `username`, `phone_number`, `contact_email`, `office_location`, `password`)
VALUES 
  ('InfoSystem', 'dept.infosystem', '1234567890', 'info_sys@gmail.com', 'Building A', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
  ('InfoScience', 'dept.infoscience', '0987654321', 'info_sci@gmail.com', 'Building B', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
  ('compScience', 'dept.compscience', '9876543210', 'comp_sci@gmail.com', 'Building C', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
  ('infoTechnology', 'dept.infoTechnology', '9876543210', 'info_tech@gmail.com', 'Building D', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
  ('Software', 'dept.software', '2345678901', 'soft_eng@gmail.com', 'Building E', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2');


-- Insert an admin
INSERT INTO `admins` (`first_name`, `last_name`, `username`, `email`, `password`)
VALUES 
  ('jhon', 'do', 'admin.jhon.do', 'admin@example.com', '$2b$10$FnNRxXprBvWeyhl4UHiDs./ZaOQg8RVm/ShFg0aqPHe0AqD.I/bO6');


-- Insert five companies
INSERT INTO companies (company_name, username, phone_number, contact_email, location, industry_sector, accepted_student_limit, website, password) VALUES
('zalatech', 'comp.zalatech', '+251-912-974411', 'info@zalatechs.com', 'Addis Ababa', 'tech', 3, 'www.zalatechs.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
('Cynooxtech', 'comp.Cynooxtech', '+251909772885', 'Cynooxtech@gmail.com', 'Addis Ababa', 'tech', 3, 'www.Cynoox.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
('Fairfaxtech', 'com.Fairfaxtech', '+251115549172', '	info@fairfaxtechnologies.com', 'Addis Ababa', 'tech', 2, 'www.Fairfax.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
('Alphait', 'comp.Alphait', '+251-912-254156', '	info@alphaitsolution.com', 'Addis Ababa', 'tech', 2, 'www.Alpha.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
('PERAGOtech', 'comp.PERAGOit', '+251-911-231622', '	Info@peragosystems.com', 'Addis Ababa', 'tech', 3, 'www.PERAGO.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2');

-- Insert ten students with different departments
INSERT INTO students (first_name, last_name, username, phone_number, contact_email, password, department_id) VALUES
('yonas', 'daniel', 'stud.yonas.da', '0967155787', 'yonasda@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 1),
('dawit', 'belete', 'stud.dawit.be', '0925567288', 'dawitbete@gamil.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 2),
('dereje', 'zerifu', 'stud.dereje.ze', '0973452687', 'derjezerf@gamil.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 3),
('daniel', 'niguse', 'stud.daniel.ni', '0945690715', 'sdanielnu2@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 4),
('yakob', 'temesgen', 'stu.yakob.te', '0955231467', 'yakobtemu@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 5),
('tsion', 'ayele', 'stud.tsion.ay', '0987541377', 'tsionayu1@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 1),
('abel', 'regasa', 'stud.abel.re', '0962145677', 'abelrega@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 2),
('helen', 'kebede', 'stud.helen.ke', '0945231691', 'helenke56@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 3),
('kalab', 'kibebew', 'stud.kalab.ki', '0935441277', 'kalabkeb66@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 4),
('tamirat', 'eyoil', 'stud.tamirat.ey', '0932557410', 'tamirateyu88@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 5);
('teddy', 'alemu', 'stud.teddy.al', '0998732211', 'teddyale8@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 5);
('ahmed', 'abdu', 'stud.ahmed.ab', '0988726367', 'ahamedab78@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 1);
('binyam', 'belete', 'stud.binyam.bi', '0945267278', 'binyambel82@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 2);
('roza', 'mesifi', 'stud.roza.me', '0972342691', 'rozamesfin2@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 5);
('betty', 'adane', 'stud.betty.ad', '0935137412', 'bettyad12@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 2);



-- Insert random departments
INSERT INTO `departments` (`department_name`, `username`, `phone_number`, `contact_email`, `office_location`, `password`)
VALUES 
  ('InfoSystem', 'dept.infosystem', '1234567890', 'info_sys@gmail.com', 'Building A', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
  ('InfoScience', 'dept.infoscience', '0987654321', 'info_sci@gmail.com', 'Building B', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
  ('compScience', 'dept.compscience', '9876543210', 'comp_sci@gmail.com', 'Building C', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
  ('infoTechnology', 'dept.infoTechnology', '9876543210', 'info_tech@gmail.com', 'Building D', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
  ('Software', 'dept.software', '2345678901', 'soft_eng@gmail.com', 'Building E', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2');

-- Admins Table
CREATE TABLE IF NOT EXISTS `admins` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `username` varchar(255) NOT NULL UNIQUE,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB;

-- Insert an admin
INSERT INTO `admins` (`first_name`, `last_name`, `username`, `email`, `password`)
VALUES 
  ('jhon', 'do', 'admin.jhon.do', 'admin@example.com', '$2b$10$FnNRxXprBvWeyhl4UHiDs./ZaOQg8RVm/ShFg0aqPHe0AqD.I/bO6');

-- Companies Table
CREATE TABLE IF NOT EXISTS `companies` (
  `company_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL UNIQUE,
  `phone_number` varchar(20),
  `contact_email` varchar(255),
  `location` varchar(255),
  `industry_sector` varchar(255),
  `accepted_student_limit` int(11),
  `website` varchar(400),
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`company_id`),
  UNIQUE KEY (`company_name`)
) ENGINE=InnoDB;

-- Students Table
CREATE TABLE IF NOT EXISTS `students` (
  `student_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `username` varchar(255) NOT NULL UNIQUE,
  `phone_number` varchar(20),
  `contact_email` varchar(255),
  `password` varchar(255) NOT NULL,
  `department_id` int(11),
  PRIMARY KEY (`student_id`),
  FOREIGN KEY (`department_id`) REFERENCES `departments`(`department_id`) ON DELETE CASCADE 
) ENGINE=InnoDB;

-- Insert five companies
INSERT INTO companies (company_name, username, phone_number, contact_email, location, industry_sector, accepted_student_limit, website, password) VALUES
('zalatech', 'comp.zalatech', '+251-912-974411', 'info@zalatechs.com', 'Addis Ababa', 'tech', 3, 'www.zalatechs.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
('Cynooxtech', 'comp.Cynooxtech', '+251909772885', 'Cynooxtech@gmail.com', 'Addis Ababa', 'tech', 3, 'www.Cynoox.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
('Fairfaxtech', 'com.Fairfaxtech', '+251115549172', '	info@fairfaxtechnologies.com', 'Addis Ababa', 'tech', 2, 'www.Fairfax.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
('Alphait', 'comp.Alphait', '+251-912-254156', '	info@alphaitsolution.com', 'Addis Ababa', 'tech', 2, 'www.Alpha.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2'),
('PERAGOtech', 'comp.PERAGOit', '+251-911-231622', '	Info@peragosystems.com', 'Addis Ababa', 'tech', 3, 'www.PERAGO.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2');

-- Insert ten students with different departments
INSERT INTO students (first_name, last_name, username, phone_number, contact_email, password, department_id) VALUES
('yonas', 'daniel', 'stud.yonas.da', '0967155787', 'yonasda@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 1),
('dawit', 'belete', 'stud.dawit.be', '0925567288', 'dawitbete@gamil.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 1),
('dereje', 'zerifu', 'stud.dereje.ze', '0973452687', 'derjezerf@gamil.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 1),
('daniel', 'niguse', 'stud.daniel.ni', '0945690715', 'sdanielnu2@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 1),
('yakob', 'temesgen', 'stud.yakob.te', '0955231467', 'yakobtemu@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 5),
('tsion', 'ayele', 'stud.tsion.ay', '0987541377', 'tsionayu1@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 2),
('abel', 'regasa', 'stud.abel.re', '0962145677', 'abelrega@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 2),
('helen', 'kebede', 'stud.helen.ke', '0945231691', 'helenke56@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 3),
('kalab', 'kibebew', 'stud.kalab.ki', '0935441277', 'kalabkeb66@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 4),
('tamirat', 'eyoil', 'stud.tamirat.ey', '0932557410', 'tamirateyu88@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 5),
('teddy', 'alemu', 'stud.teddy.al', '0998732211', 'teddyale8@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 5),
('ahmed', 'abdu', 'stud.ahmed.ab', '0988726367', 'ahamedab78@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 3),
('binyam', 'belete', 'stud.binyam.bi', '0945267278', 'binyambel82@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 4),
('roza', 'mesifi', 'stud.roza.me', '0972342691', 'rozamesfin2@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 5),
('betty', 'adane', 'stud.betty.ad', '0935137412', 'bettyad12@gmail.com', '$2b$10$NQcPKGOvYo6.51l7aR.nkuVxdNZazz7xKE28i8jLKNHmCdcAkWMC2', 3);