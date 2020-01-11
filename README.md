# Reclass
### Project 2/Web Seek

A full stack, MVC (Model-View-Controller) duel application that allows job seekers to search and apply for web development jobs all over country depending on their search parameters.  This application also allows potential employers to post any web development openings they wish to fill.  The application is very user friendly, intuitive and mobile responsive.

# Link to Dev Seek


# How the app works

This application is set up to service both web development applicants and employers looking to hire them. The job seeker starts by filling out a form with the job title and the state where they wish to look for a job.  This will query the database(Read) and match them with the parameters typed into the form. This action will populate dynamically onto the DOM a list of jobs.  At that point the job seeker will have the opportunity to apply to any job listed by hitting the apply button(Update). This will change the apply button text to "applied"(Also updating the database) and will add that job to jobs applied tab, where the job seeker will have the opportunity to delete(Delete) that application.  The app also has a recent jobs added tab, where only jobs that were posted by an employer within the last 24 hours will populate.  There the job seeker will have the ability to apply and delete(Same as the form).

Employers have the ability to list web development jobs that they wish to fill. They can click on the Employer Post tab, which will then take them to a form.  There they can input all the information regarding their job posting(Post).  After they input all required fields and submitting the form, their job posting will be added to our database.



# How the app is built
This project uses MySQL, Node, Express, ORM (Object Relational Mapper). Node and MySQL are used to query and route data in the application. Express is the backend web framework used for this application, and an ORM is a programming technique for converting data between incompatible type systems using object-oriented programming languages.

# Technologies used to build app

## Backend technologies
* Node.js 
* MySQL 
* Express 
* ORM - Object Relational Mapping 
* Moment
## Frontend technologies
* HTML
* CSS
* Google Fonts
* Bootstrap 
* Javascript
* jQuery
* Moment
* Font Awesome
## ScreenShots
