create database EduPulse;

use EduPulse;
create table users(
	id int auto_increment primary key,
	username varchar(10) not null unique,
    password varchar(256) not null,
    usertype varchar(10) not null
);

insert into users (username, password, usertype)
values ('s00001', 's00001@ss', 'student'),
	('t001', 't001@ss', 'teacher'),
    ('a01', 'a01@ss', ' admin');
    
-- select * from users;

-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
-- flush privileges;



