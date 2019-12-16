DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR(50) NOT NULL,
    last VARCHAR(50) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE CHECK (email <>''),
    url VARCHAR(300),
    bio TEXT,
    password VARCHAR(200) NOT NULL,
    mentor BOOLEAN DEFAULT FALSE,
    taken BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);





INSERT INTO users (first, last, email, password, url, bio, mentor) VALUES ('Mary', 'Stone', 'habanero0@example.com', '$2a$10$RrF.hPWQ84N4uxOJPHbdqOQ3U6S/xsrI11Mn7PSZi/aN0wmGgJxga', 'https://randomuser.me/api/portraits/men/84.jpg', 'Son. Father-in-Law. Capitalist. Try the veal. 🚭⛅️🔊', 'false'),('Teresa', 'Landry Jones', 'habanero1@example.com', '$2a$10$RrF.hPWQ84N4uxOJPHbdqOQ3U6S/xsrI11Mn7PSZi/aN0wmGgJxga', 'https://images.unsplash.com/photo-1545152423-57a801859a35?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ', 'Granddaughter. Step-Mother. Rear Admiral. Tragedy + time. 💛☎️👓', 'true'),('Michelle', 'Foy', 'habanero2@example.com', '$2a$10$RrF.hPWQ84N4uxOJPHbdqOQ3U6S/xsrI11Mn7PSZi/aN0wmGgJxga', 'https://images.pexels.com/photos/412840/pexels-photo-412840.jpeg?h=350&auto=compress&cs=tinysrgb', 'Step-Son. Boyfriend. DBA. It''s an honor just to be nominated. 😎🍉🎩', 'false'),('Jena', 'Zhang', 'habanero3@example.com', '$2a$10$RrF.hPWQ84N4uxOJPHbdqOQ3U6S/xsrI11Mn7PSZi/aN0wmGgJxga', 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ', 'Aunt. Sister-in-Law. Security Guard. The sea was angry that day, my friends. 🥋🥋🧠', 'true'),('Dana', 'Jovovich', 'habanero4@example.com', '$2a$10$RrF.hPWQ84N4uxOJPHbdqOQ3U6S/xsrI11Mn7PSZi/aN0wmGgJxga', 'https://m.media-amazon.com/images/M/MV5BMjI0MTg3MzI0M15BMl5BanBnXkFtZTcwMzQyODU2Mw@@._V1_UY256_CR9,0,172,256_AL_.jpg', 'Son-in-Law. Great-Grandson. Egyptologist. Citation needed. 🎲🔱🐢', 'true'),('Joni', 'Garland', 'habanero5@example.com', '$2a$10$RrF.hPWQ84N4uxOJPHbdqOQ3U6S/xsrI11Mn7PSZi/aN0wmGgJxga', 'https://tinyfac.es/data/avatars/1C4EEDC2-FE9C-40B3-A2C9-A038873EE692-200w.jpeg', 'Father-in-Law. Step-Brother. Jazz Singer. Give me liberty or give me death. 🧫👁‍🥉', 'false'),('Aiden', 'Pepperson', 'habanero6@example.com', '$2a$10$RrF.hPWQ84N4uxOJPHbdqOQ3U6S/xsrI11Mn7PSZi/aN0wmGgJxga', 'https://images.pexels.com/photos/459947/pexels-photo-459947.jpeg?h=350&auto=compress&cs=tinysrgb', 'Sister-in-Law. Granddaughter. Office Manager. This is your brain on drugs. 🖱🍗🛸', 'true');
