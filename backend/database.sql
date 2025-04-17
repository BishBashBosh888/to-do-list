create database to_do_list;

-- connect to db
\c to_do_list

create table users(
    id serial primary key,
    name varchar(100) not null,
    email varchar(100) unique not null,
    password varchar(100) not null,
    created_at timestamp default current_timestamp
);

create table tasks(
    id serial primary key,
    user_id int references users(id) on delete cascade,
    title varchar(100) not null,
    description text,
    is_completed boolean default false,
    due_date timestamp,
    created_at timestamp default current_timestamp
);

alter table users
add column password_reset_token varchar(255),
add column token_expiry timestamp;
