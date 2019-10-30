react-redux-material is where all of the client side code refactoring is happening

The server just exists to serve up the files while developing. Editing path in '/server/index.js' to 'react-material' serves previous library proof of concept.

Currently the app has no connectivity to firebase. Skeleton-ing out the front end and establishing local versions of data handling.

to start, open two terminal instances:

npm install
npm run react-dev (in one terminal)
npm run server-dev (in second terminal)
visit localhost:3000
