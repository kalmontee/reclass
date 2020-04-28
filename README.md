# Dev Seek

A full stack, MVC (Model-View-Controller) dual application that allows job seekers to search and apply for web development jobs all over the country depending on their search parameters. This application also allows potential employers to post any web development openings they wish to fill. The application is very user friendly, intuitive and mobile responsive.

## Demo
To view the app go to:

[devseek.herokuapp.com](https://devseek.herokuapp.com/)

# How the App Works
This application is set up to service both web development applicants and employers looking to hire them. The job seeker starts by filling out a form with the job title and the state where they wish to look for a job.  This will query the database(Read) and match them with the parameters typed into the form. This action will populate dynamically onto the DOM a list of jobs.  At that point the job seeker will have the opportunity to apply to any job listed by hitting the apply button(Update). This will change the apply button text to "applied"(Also updating the database) and will add that job to jobs applied tab, where the job seeker will have the opportunity to delete(Delete) that application.  The app also has a recent jobs added tab, where only jobs that were posted by an employer within the last 24 hours will populate.  There the job seeker will have the ability to apply and delete(Same as the form).

Employers have the ability to list web development jobs that they wish to fill. They can click on the Employer Post tab, which will then take them to a form.  There they can input all the information regarding their job posting(Post).  After they input all required fields and submitting the form, their job posting will be added to our database.

### Search Jobs:
Any keywords that have ```Engineer``` or ```Developer``` will display all jobs available results within the current state the user decides to search.

![Screenshot (101)](https://user-images.githubusercontent.com/52462582/72583574-ce9ebe00-38b4-11ea-89e6-160c92ab2886.png)

### Employer Post Job:
This is where the employer will post a job. 

![Screenshot (102)](https://user-images.githubusercontent.com/52462582/72583667-1d4c5800-38b5-11ea-8f50-5cec7ab74cad.png)

### Recent Jobs Added:
Will include three tabs:

```All Jobs Available``` - display all the jobs available in the database.

```Recent Jobs Added``` - Will display all the jobs added within 24 hours.

```Jobs Applied``` - All jobs the user applied to. Giving it the option of deleting the job.

![Screenshot (103)](https://user-images.githubusercontent.com/52462582/72584106-bcbe1a80-38b6-11ea-9384-86243ff6e75f.png)


# How the App is Built
This project uses MySQL, Node, Express, ORM (Object Relational Mapper). Node and MySQL are used to query and route data in the application. Express is the backend web framework used for this application, and an ORM is a programming technique for converting data between incompatible type systems using object-oriented programming languages.

# Technologies Used to Build App

## Frontend Technologies
* HTML
* CSS
* Google Fonts
* Bootstrap 
* Javascript
* jQuery
* Moment
* Font Awesome

## Backend Technologies
* Node.js 
* MySQL 
* Express 
* ORM - Object Relational Mapping 
* Moment

## Getting Started
This project is running locally on Heroku. If you wish to have this on your own host server then you must create a Heroku account if you don't have one yet. Use JAWSdb icons on Heroku to setup your database.

### Prerequisites
Begin with an npm install. This should automatically install everything up to date. 

```
npm install
npm test
```

### Installing
If npm install failed then proceed to download all

```
npm install moment
npm install express
npm install mysql
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Authors
* **Felix Fernandez** - [jetsgreen](https://github.com/jetsgreen)
* **Kelvin Almonte** - [kalmontee](https://github.com/kalmontee)

## License
[LICENSE.md](LICENSE.md)

## Acknowledgments
I would like to acknowledge my TAs [Francisco](https://github.com/fcruz219) and Leigh for doing an excellent job helping us fix minor bugs and  illustrating different ideas on how to solve a few logic problems.
