import mysql from 'mysql';

var conn = new mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'dontforget',
    database : 'WebAnimal'
});

conn.connect(function(err){
	if(err){
    	console.log('Error connecting to Db');
    	console.log(err);
    	return;
  	}
  	console.log('MySQL connection established');
});

export default conn;

/*

CREATE TABLE `User` (
  `userId` varchar(45) NOT NULL,
  `fbId` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `lastLogin` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL DEFAULT '',
  `mobile` varchar(45) NOT NULL DEFAULT '',
  `lineId` varchar(45) NOT NULL DEFAULT '',
  `verifyId` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `fbId_UNIQUE` (`fbId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8

CREATE TABLE `webanimal`.`Case` (
  `caseId` VARCHAR(45) NOT NULL,
  `userId` VARCHAR(45) NOT NULL,
  `lock` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'If lock is 1 means cannot edit caseName, profilePicture, description, animalType, animalName.\n\nOnly fundStatus and caseStatus can be updated',
  `caseName` VARCHAR(45) NOT NULL,
  `profilePicture` VARCHAR(45) NULL,
  `description` VARCHAR(255) NOT NULL,
  `animalType` VARCHAR(45) NOT NULL,
  `animalName` VARCHAR(45) NOT NULL,
  `fundStatus` VARCHAR(45) NOT NULL,
  `caseStatus` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`caseId`),
  UNIQUE INDEX `caseId_UNIQUE` (`caseId` ASC),
  INDEX `userId_idx` (`userId` ASC),
  CONSTRAINT `user`
    FOREIGN KEY (`userId`)
    REFERENCES `webanimal`.`User` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


*/