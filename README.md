Fullstack - Mini Updoc Project

Description

 - The candidate will write a tiny MVP of Updoc.

# Limitations & Expectations : 

 - Duration: 1 Hour
 - The candidate is not being tested on whether or not they finish the everything
 - The candidate may google, and use the internet freely to help solve problems
 - The candidate may ask clarifying questions about the problems, implementation, or really anything including typescript if they are not familiar with any part of the problem
 - We expect a lot of communication during the test
 - After the test there will be 10 minutes for discussion and questions.

# Getting started
 - Frontend cd client && npm install && npm run start at localhost:3000
 - Backend cd server && npm install && npm run start at localhost:3001

# The solution aims to have these features implemented:
 - Allow the creation, deletion, and updating of Tickets
 - Handle log-in and log-out of Users
 - Allow patients to fill in a form that creates a Ticket
 - Allow doctors to view and update tickets
 - Log actions for those tickets

# The boilerplate includes
 - An expressjs server with Ticket routes already implemented
 - A react frontend with a User form already implemented

# The technical implementation involves:
 - Representing Users, Tickets, and Actions
 - Representing a Patient and Doctor User
 - Implementing a simple HTML form for the patient form
 - Some basic CSS (described below)
 - Implementing a form, or just free-floating buttons for the doctors Ticket handling page
 - Storing and modifying data (any method of storage is acceptable, from an in memory object, to file storage, to a DB.)
 - Logging actions and showing them on the doctors page

# The frontend:
 - Must use react and typescript
 - May not use any CSS frameworks
 - May use any other libraries the candidate opts to use
 - Three routes 
    - / (started in the boilerplate) A welcome page
    - /consultation The user can make a new request as a patient
    - /ticket The user can pick up a ticket and execute actions on it
 - The frontend pages:
 - Must be responsive
 - Off-white background
 - Centered horizontally container for the form that is limited to 1000px wide
 - A header
    - on the left: site name
    - on the right: logout button or (username|password|submit) login form component horizontally laid out
- Patient form layout must be laid out with these rows: (First name, Last name), (Age, Sex), (Symptoms), (Submit)
- Doctor page must be laid out in a 2 column layout,
    - these rows in the first column: (First name, Last name), (Age, Sex), (Symptoms)
    - these rows in the second column: (Action dropdown), (Notes textbox), (Submit button)

# The backend:
    - Must use typescript
    - May use any other libraries the candidate opts to use
    - signup_or_login endpoint that is called by the login form in the header
    - Upon completing a ticket, the doctor should receive the next ticket