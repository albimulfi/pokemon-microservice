create database if not exists pokemon_db;
use pokemon_db;

create table if not exists pokemon (
    id int primary key auto_increment,
    name varchar(100),
    type varchar(50),
    hp int,
    attack_power int
);

insert into pokemon (name, type, hp, attack_power) values
('Pikachu', 'Electric', 35, 55),
('Bulbasaur', 'Grass/Poison', 45, 49),
('Charmander', 'Fire', 39, 52),
('Squirtle', 'Water', 44, 48);