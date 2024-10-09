use DoAnCNTT

CREATE TABLE users (
    id int PRIMARY KEY IDENTITY(1,1),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    type int  
	FOREIGN KEY (type) REFERENCES roleid(id)
);

CREATE TABLE roleid (
	id int PRIMARY KEY,
	class VARCHAR(50) NOT NULL
);


CREATE TABLE premium (
	id int PRIMARY KEY,
	premium_day int NOT NULL,
	date_create DATE NOT NULL,
	FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE,
);

CREATE TABLE songs (
    id int PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist_id INT NOT NULL,
    album_id INT,
    genre VARCHAR(100),
    duration INT,
    file_path VARCHAR(255) NOT NULL,
	img_song VARCHAR(255) NOT NULL
);


CREATE TABLE artists (
    id int PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    bio TEXT,
	img_artists VARCHAR(255) NOT NULL,

);

CREATE TABLE albums (
    id int PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist_id INT NOT NULL,
    release_date DATE,
    cover_image_path VARCHAR(255), -- Đường dẫn ảnh bìa album
);

CREATE TABLE playlists (
    id int PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
);

CREATE TABLE playlist_songs (
    playlist_id INT NOT NULL,
    song_id INT NOT NULL,
    PRIMARY KEY (playlist_id, song_id),
    FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE,
    FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE
);

CREATE TABLE likes (
    user_id INT NOT NULL,
    song_id INT NOT NULL,
    PRIMARY KEY (user_id, song_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE
);

CREATE TABLE follows (
    user_id INT NOT NULL,
    artist_id INT NOT NULL,
    PRIMARY KEY (user_id, artist_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE
);

