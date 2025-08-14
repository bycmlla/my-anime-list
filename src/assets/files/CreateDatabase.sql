CREATE SCHEMA myanimelist;

USE myanimelist;

CREATE TABLE obras (
	id 	INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category ENUM("Anime", "Filme", "Série") NOT NULL,
    year YEAR NOT NULL,
    description TEXT,
    rating INT,
    genre VARCHAR(255),
    authors VARCHAR(255),
    cover VARCHAR(255),
    created_at TIMESTAMP default current_timestamp,
    dominant_color VARCHAR(7)
);

CREATE TABLE imagens_obras (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    obra_id INT NOT NULL,
    url VARCHAR(255) NOT NULL,
    FOREIGN KEY (obra_id) REFERENCES obras(id) ON DELETE CASCADE
);
