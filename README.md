# Teamoji

## About

The Teamoji Application is a tool designed to track how teams or individuals are progressing and feeling over time and to share people's ideas and feelings with the rest of the team.

This is done through the ACT Matrix in which users can place sticky notes and emojis to illustrate their thoughts and emotions in regards to their current state. 

The application also allows users to view their previous history of ACT matrices and collaborate in real time with other team members.

Security was not in the budget for this release of this project, likely to be a key feature for future releases due to the handling of possibly sensitive information.

Teams can review each matrix once completed, tracking how the team is feeling over a period of time on a specific topic/project/question.

A React Frontend with node.js used as the event-driven server, and a Firebase Backend/Database is used.


## Running Application

Ensure Node version 12 or higher is installed

To run in a development enviroment:

`npm run dev`


## Building Application

To compile code to public folder:

`npx webpack --config webpack.config.js`


## Deploying Application

Ensure Firebase is installed using:

`npm install firebase`

to deploy:

`firebase deploy --only hosting:teamoji-matrix`

## Website

https://teamoji-matrix.web.app/


Notes:

to deploy run:
firebase deploy --only hosting:teamoji-matrix which will deploy the public directory

to compile code to public folder run:
npx webpack --config webpack.config.js

to deploy the backend
use: "C:\Users\Kieran\AppData\Local\Google\Cloud SDK\google-cloud-sdk\bin\gcloud" app deploy (for Kieran only)
Or the google cloud sdk with app deploy
