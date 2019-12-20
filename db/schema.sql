DROP DATABASE IF EXISTS job_seeker;
CREATE database job_seeker;
USE job_seeker;

CREATE TABLE jobs (
job_id integer not null auto_increment,
job_title varchar(100),
job_state varchar(100),
job_city varchar(100),
job_salary int,
job_description varchar(1000),
job_requirements varchar(200),
primary key (job_id)
);

select * from jobs;

insert into jobs (job_title, job_state, job_city, job_salary, job_description, job_requirements)
values ("Entry_Level Software Engineer", "New Jersey", "Jersey City", 65000, 
"This is an entry level developer position to assist in the development 
and maintenance of web applications and/or enterprise systems.", "MySQL, Javascript, Reat.JS")