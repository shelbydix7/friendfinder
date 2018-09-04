DROP DATABASE IF EXISTS friend_finder;
CREATE DATABASE friend_finder;

USE friend_finder;

CREATE TABLE friends (
  id INT NOT NULL AUTO_INCREMENT,
  friend_name VARCHAR(100) NOT NULL,
  avatar VARCHAR(100),
  scores VARCHAR(100) NOT NULL,
  PRIMARY KEY(id)
);

DESC friends;