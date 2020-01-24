BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('Amron', 'amron@gmail.com', 5, '2019-01-01');
INSERT into login (hash, email) values ('$2a$10$xOaZk/xH/dPPJmRCdut9JeybdFCTVJMgEpVAFfNJxKakrIosSAU0G', 'amron@gmail.com');

COMMIT;