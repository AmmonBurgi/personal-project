create table pro_user (
user_id serial primary key,
email varchar(200) not null,
username varchar(50) not null,
password text not null
);

create table pro_entries (
entry_id serial primary key,
title varchar(100),
content text,
date varchar(20),
author_id integer REFERENCES pro_user(user_id)
);

create table pro_goals (
goal_id serial primary key,
title varchar(200) not null,
content text not null,
author_id integer references pro_user(user_id)
);