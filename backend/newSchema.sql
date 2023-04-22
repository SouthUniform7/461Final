CREATE TABLE movie (
  movieID INTEGER PRIMARY KEY,
  directorID INTEGER,
  title TEXT,
  releaseDate DATE,
  runtime INTEGER,
  genre TEXT,
  plotSummary TEXT,
  studioID INTEGER,
  FOREIGN KEY(directorID) REFERENCES director(directorID),
  FOREIGN KEY(studioID) REFERENCES studio(studioID)
);

CREATE TABLE director (
  directorID INTEGER PRIMARY KEY,
  name TEXT,
  birthdate DATE,
  gender TEXT,
  nationality TEXT
);

CREATE TABLE actor (
  actorID INTEGER PRIMARY KEY,
  name TEXT,
  birthdate DATE,
  gender TEXT,
  nationality TEXT
);

CREATE TABLE characters (
  characterID INTEGER PRIMARY KEY,
  movieID INTEGER,
  actorID INTEGER,
  name TEXT,
  FOREIGN KEY(movieID) REFERENCES movie(movieID),
  FOREIGN KEY(actorID) REFERENCES actor(actorID)
);

CREATE TABLE studio (
  studioID INTEGER PRIMARY KEY,
  name TEXT,
  location TEXT,
  foundingDate DATE
);

CREATE TABLE rating (
  ratingID INTEGER PRIMARY KEY,
  movieID INTEGER,
  rating REAL,
  FOREIGN KEY(movieID) REFERENCES movie(movieID)
);

CREATE TABLE userScoreAverage (
  userScoreID INTEGER PRIMARY KEY,
  movieID INTEGER,
  score INTEGER,
  FOREIGN KEY(movieID) REFERENCES movie(movieID)
);

CREATE TABLE user (
  id INTEGER PRIMARY KEY,
  username TEXT UNIQUE,
  password TEXT
);
