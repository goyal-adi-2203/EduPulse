create database EduPulse;

use EduPulse;
create table users(
	id int auto_increment primary key,
	username varchar(10) not null unique,
    password varchar(256) not null,
    usertype varchar(10) not null
);

insert into users (username, password, usertype)
values ('s00001', 's00001@edu', 'student'),
	('t001', 't001@edu', 'teacher'),
    ('a01', 'a01@edu', 'admin');
    
select * from users;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'adityaroot';
flush privileges;



