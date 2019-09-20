# Task Backend
 Application where save tasks of the logged in user;
           
 ### PostgreSQL
 
 - ###### Install PostgreSQL Ubuntu
       sudo apt update
       sudo apt install postgresql postgresql-contrib
 - ###### Show version postgreSQL
       sudo -u postgres psql -c "SELECT version();"
 - ###### Accessing postgres user and show databases created
       sudo su – postgres
       psql -l
 - ###### Accessing enviroment with psql and created database
       psql
       CREATE DATABASE tasks;
 - ###### Connecting database and show table names
       \c supply
       \dt
       
 ### Project
 - ###### Installation
       sudo apt install npm
       sudo npm install
 - ###### knex - performing migrations
       - run migrations
           sudo knex migrate:latest
       - undo migrations
           sudo knex migrate:rollback
