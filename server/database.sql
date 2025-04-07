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
    FOREIGN KEY (userName, product_name) REFERENCES goods(userName, product_name)

);

INSERT INTO suppliers (userName, pass, company_id, phone_number, agent_name) 
VALUES ('supplier1', 'password', '123', '050-1234567', 'Agent 1');

INSERT INTO goods (userName, product_name, price, min_sum) 
VALUES 
('supplier1', 'Product 1', 100, 5),
('supplier1', 'Product 2', 200, 10);
