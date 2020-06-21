DROP TABLE IF EXISTS player_positions;
DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS coaches;
DROP TABLE IF EXISTS divisions;
DROP TABLE IF EXISTS positions;

CREATE TABLE coaches (
	id INT AUTO_INCREMENT PRIMARY KEY,
	fname VARCHAR(255) NOT NULL,
	lname VARCHAR(255) NOT NULL,
	age INT NOT NULL
) ENGINE = InnoDB;

CREATE TABLE teams (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	city VARCHAR(255) NOT NULL,
	coach_id INT,
	FOREIGN KEY(coach_id) REFERENCES coaches(id)
	ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE TABLE players (
	id INT AUTO_INCREMENT PRIMARY KEY,
	fname VARCHAR(255) NOT NULL,
	lname VARCHAR(255) NOT NULL,
	age INT NOT NULL,
	team INT,
	coach INT,
	FOREIGN KEY(team) REFERENCES teams(id)
	ON DELETE SET NULL ON UPDATE CASCADE,
	FOREIGN KEY(coach) REFERENCES coaches(id)
	ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB;


CREATE TABLE positions (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE player_positions (
	player_id INT,
	position_id INT NOT NULL,
	FOREIGN KEY(player_id) REFERENCES players(id)
	ON DELETE SET NULL ON UPDATE CASCADE,
	FOREIGN KEY(position_id) REFERENCES positions(id)
	ON DELETE RESTRICT ON UPDATE CASCADE 
) ENGINE = InnoDB;


INSERT INTO positions(name) VALUES
('PointGuard'), ('ShootingGuard'), ('SmallForward'), ('PowerForward'), ('Center');

INSERT INTO coaches(fname,lname,age) VALUES
('Brad','Stevens',41), ('Dwayne','Casey',60),
('Tyron','Lue',40), ('Stan','Gundy',58),
('Scott','Brooks',52), ('Erik','Spoelstra',47);

INSERT INTO teams(name,city,coach_id) VALUES
('Celtics','Boston',1), ('Raptors','Toronto',2),
('Cavaliers','Cleveland',3), ('Pistons','Detroit',4),
('Wizards','Washington',5), ('Heat','Miami',6);

INSERT INTO players(fname,lname,age,team,coach) VALUES
('Kyrie','Irving',25,1,1),('Jaylen','Brown',21,1,1),('Jayson','Tatum',19,1,1),('Al','Horford',31,1,1),('Aron','Baynes',31,1,1),
('Kyle','Lowry',31,2,2),('Demar','DeRozan',28,2,2),('Norman','Powell',24,2,2),('Serge','Ibaka',28,2,2),('Jonas','Valanciunas',25,2,2),
('Jose','Calderon',36,3,3),('Earl','Smith',32,3,3),('Jae','Crowder',27,3,3),('Lebron','James',33,3,3),('Kevin','Love',29,3,3),
('Reggie','Jackson',27,4,4),('Avery','Bradley',27,4,4),('Tobias','Harris',25,4,4),('Stanley','Johnson',21,4,4),('Andre','Drummond',24,4,4),
('John','Wall',27,5,5),('Bradly','Beal',24,5,5),('Otto','Porter',24,5,5),('Markieff','Morris',28,5,5),('Marcin','Gortat',33,5,5),
('Goran','Dragic',31,6,6),('Dion','Waiters',26,6,6),('Josh','Richardson',24,6,6),('Justise','Winslow',21,6,6),('Hassan','Whiteside',28,6,6);

INSERT INTO player_positions (player_id,position_id) VALUES
(1,1),(2,3),(3,3),(4,5),(5,5),
(6,1),(7,2),(8,2),(9,4),(9,5),(10,5),
(11,1),(12,2),(12,3),(13,3),(14,2),(14,3),(14,4),(15,4),(15,5),
(16,1),(17,1),(17,2),(18,3),(18,4),(19,3),(20,5),
(21,1),(22,2),(23,3),(24,4),(25,5),
(26,1),(26,2),(27,2),(28,2),(28,3),(29,4),(30,5);












