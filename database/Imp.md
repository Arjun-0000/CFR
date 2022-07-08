/* sql query to add new tables - backup */

CREATE TABLE `learnbyweb`.`coursecontent` 
(   `CourseID` INT NOT NULL AUTO_INCREMENT , 
    `Class` INT(4) NOT NULL , 
    `Subject` TEXT NOT NULL , 
    `UnitsNum` INT(2) NULL , 
    `UnitsName` TEXT NULL , 
    `Subunits` TEXT NULL , 
    `Contents` LONGTEXT NULL , 
    PRIMARY KEY (`unique`)
) 
ENGINE = InnoDB;