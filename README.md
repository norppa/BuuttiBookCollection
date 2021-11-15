# Buutti Book Collection

Buutti Book Collection (BBC) is a simple full stack Node/React application that allows user to view, add, delete or modify books stored in a database. The backend Express server and SQLite3 database. The backend tests are made using mocha and chai. 

## Starting the application

The application has been divided into two parts, the frontend and the backend. After cloning the application you need to install the required npm dependencies. Navigate to the project root folder and execute
```
npm run init
```
This installs the dependencies to both frontend and backend applications, and builds the frontend. After this, BBC is ready to be started:
```
npm start
```
BBC runs by default on port 80, so open your browser and head to http://localhost to view the application. Note that the start script does not open your browser automatically.

## Starting the application in development mode

In development mode the application runs backend and frontend separately. To start the backend, navigate to the project root folder and run:
```
npm run dev
```
Backend runs in development mode on port 3000. To start the frontend navigate to ```/frontend``` and run:
```
npm run dev
```
Frontend runs in development mode on port 8080.

## Running the automated tests

To run the backend tests, execute
```
npm run test
```





