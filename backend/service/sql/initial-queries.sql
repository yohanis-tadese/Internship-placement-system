-- Departments Table
CREATE TABLE IF NOT EXISTS `departments` (
  `department_id` int(11) NOT NULL AUTO_INCREMENT,
  `department_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL UNIQUE,
  `phone_number` varchar(20),
  `contact_email` varchar(255),
  `office_location` varchar(255),
  `department_type` varchar(100) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`department_id`),
  UNIQUE KEY (`department_name`),
  INDEX (`department_type`) -- Add index to department_type
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

-- Students Table
CREATE TABLE IF NOT EXISTS `students` (
  `student_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `username` varchar(255) NOT NULL UNIQUE,
  `phone_number` varchar(20),
  `contact_email` varchar(255),
  `password` varchar(255) NOT NULL,
  `department_type` varchar(100),
  PRIMARY KEY (`student_id`),
  FOREIGN KEY (`department_type`) REFERENCES `departments`(`department_type`) ON DELETE CASCADE -- Modify foreign key constraint to cascade delete
) ENGINE=InnoDB;
