# Log Parser Application
A simple log parser application built on Express.js and React to read log files, parse relevant lines, and download a JSON report.

### Setting up and Running

- Clone the repo to a local machine using `git clone`
- `cd` into the repo base directory

#### *Server*
To start the server that provides the backend
- `cd server`
- `npm run build` to transpile TypeScript into JS
- `npm run start` to start the server. It will get started on port `6969` by default

#### *Frontend*
To start the React application which provides a UI to do the actual upload,
- `cd client` 
- `npm run build`
- `npm run start`. This will start the React.js application on port `3000`

#### *Usage*
- Navigate to `localhost:3000` on any browser
- Upload a log file with the correct format using the file picker
- Hit submit and the result should be downloaded


### Future Enhancements
- Improvement of UI of the application. Currently it is quite simple and functional.
- Adding the ability to paste log text directly into the React based front-end.
    - Ability already exists to send log text directly to the API using Postman.