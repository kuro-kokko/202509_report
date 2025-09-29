CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INTEGER NOT NULL,
    del_flg BOOLEAN DEFAULT FALSE
);

INSERT INTO users (name, age, del_flg) VALUES 
('田中太郎', 25, false),
('田中花子', 30, false),
('佐藤次郎', 35, false),
('山田智子', 28, false),
('鈴木一郎', 42, true);
