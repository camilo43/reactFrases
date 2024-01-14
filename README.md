Application Name:

My Quotes is a modular application developed using the MERN technologies. I focused on handling hooks and states within it.

Description:

	Signup:
 
- To access the application, users need to register on the page. If a user tries to log in without an active account, they will be notified through a message to register.

- The registration window has specific conditions that a new user must meet, for example:

- The email structure should be: text + @ + text + .com.

- A username must be entered.

- When asked to enter the password again, it is verified that the two match.

- All fields are required.

- If the user does not meet any of the conditions, the application will inform them of the problem with a message that will appear at the bottom of the incorrectly filled field.

- Once the user enters all the required data, an automatic login will take them to the main page.

	Login:

If the user has an active account and wants to log in again, they can do so by entering their email and password. If the email is not found in the database, a message will inform the user to register. If the provided email does not meet the established conditions, a message will appear at the bottom of the incorrectly filled field, informing the user of the error.

If the email is found in the database but the password is incorrect, the user will be informed through a written message and asked to enter it again.

	Google Authentication:
 
If the user has a Google account, they can access the application using the "Sign in with Google" button. This authentication method was developed from scratch, and there was no need to use passport or similar libraries.

Once the user registers using Google, their name and email will be stored in the database. If the user wants to log in again, they can do so using the "Sign in with Google" button. The email account used in this process, being registered in the database, cannot be used to create another user in the future.

	Quotes:
 
After the email is verified, the user can access the main page of the application where they can write, save information, and delete it if desired.
There is no word limit; the user can write from a single letter to multiple paragraphs.
The user will have a limit of 10 minutes to interact with the application. After this time, the cookie used to authenticate will expire, and they will be asked to log in again.

Technologies Used:

The application was developed using MERN. Data transfer for authentication and maintaining the session opened is done through tokens and cookies. State updates are managed with React hooks.

Application Structure:

Within the same file, I have separated the frontend and backend into two different folders.

Backend:

Controllers: This is the logical part of the backend. I have separated them into four different files: one for login, one for signup, one for Google Auth, and one for quotes.

Testing: Due to the size of the application, I have decided to perform only end-to-end tests. For those parts of the code that require storage and data collection to be tested, I have used mongodb-memory-server.

Models: In this folder, the models that will be used to interact with the database in the application are defined.

Index: This file is used to start the server.

App: In this file, the connection to the database is made, an instance of Express is created, and CORS headers are defined.

Frontend:

Public: In this folder, the images used in the application, mainly logos and icons, are stored. The HTML code that will be used as the basis for our application is also stored here.

Axios: The requests made to the server are separated based on their functionality: login, signup, quotes.

Components: In this folder, the modules used to build the application are stored. Each module has its logic.

App: This file contains the routes that will be used during navigation.

Index: In this file, the content of the application is rendered.
  
Styles: Due to the current size of the application and given that the chances of scaling it are few, I have created a single style sheet for the entire project.
