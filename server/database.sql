drop database super_market;

create database super_market;

\c super_market;

create table suppliers(
    userName text primary key,
    pass text,
    company_id text,
    phone_number text,
    agent_name text
);

create table goods(
    userName text references suppliers(userName),
    product_name text,
    price integer, 
    min_sum integer,
    primary key (userName, product_name)

);

create table orders(
    userName text,
    product_name text,
    count integer,
    stat text,
    primary key (userName, product_name),
    FOREIGN KEY (userName, product_name) REFERENCES goods(user_name, product_name)

);
