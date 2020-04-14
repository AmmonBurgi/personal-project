create table pro_user (
user_id serial primary key,
email varchar(200) not null,
username varchar(50) not null,
password text not null
);