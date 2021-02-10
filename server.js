import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { v4 } from 'uuid';

/* Initiate instance app */
const app = express();

/* Path vars*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Set Static directory */
app.use(express.static(path.join(__dirname, 'website')));

/* Middlewares */
app.use(bodyParser.json()); // Handle raw JSON
app.use(bodyParser.urlencoded({ extended: false })); // Handle form submissions
app.use(cors()); //  Cross origin allowance

/* Routes */
let appData = {}; // Setup empty JS object to act as endpoint for all routes

app.get('/all', (req, res) => {
  console.log('Server-GET /all >> running...: ');
  console.log('Server-GET /all appData >> ', appData);
  res.send(appData);
});

app.post('/add', (req, res) => {
  console.log('Server-POST /add >> running')
  appData = {
    id: v4(),
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content,
  };
  // req.get(appData);
});


// app.get('/createmenu', (req, res) => {
//   console.log('added menu!!');
//   res.send('ADDED MENU!');
// })

/* ------------------------ */
/* Setup Server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));


/* -------------------------- */
/* Exports */
// import fs from 'fs';
// import parse from 'csv-parse/lib/sync.js';

// // console.log(fs.version);
// console.log(parse.version);
// export {fs, parse};


// "scripts": {
  //   "start": "node server",
  //   "dev": "nodemon server"
  // },
  