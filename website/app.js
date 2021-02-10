const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '1e335aa074fcfb1f00abfb7fa0ce9b61';

// Create a new date instance dynamically with JS
const d = new Date();
const newDate = d.toLocaleString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

document.getElementById('generateBtn').addEventListener('click', (e) => {
  // console.log('Clicked successfully!');
  e.preventDefault(); //
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  const country = document.getElementById('country').value;

  getTempFromAPI(baseURL, country, zipCode, apiKey)
    .then((userData) => {
      console.log('.then userData: ', userData);
      postData('/add', {
        date: newDate,
        temp: userData.main.temp,
        content: feelings,
      });
    })
    .then(updateUI);
});

let postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  });

  try {
    const userData = await req.json();
    return userData;
  } catch (error) {
    console.log('postData Error: ', error);
  }
};

let getTempFromAPI = async (baseURL, country, zipCode, apiKey) => {
  const url = baseURL + zipCode + ',' + country + '&units=metric' + '&APPID=' + apiKey;
  console.log('getTempFromAPI URL: ', url);
  const response = await fetch(url);
  // console.log('getTempFromAPI RESPONSE: ', response);
  try {
    const userData = await response.json();
    // console.log('getTempFromAPI userData: ', userData);
    return userData;
  } catch (error) {
    console.log('getTempFromAPI Error: ', error);
  }
};

let updateUI = async () => {
  const request = await fetch('/all');
  try {
    const dataObject = await request.json();

    document.getElementById('date').innerHTML = dataObject.date;
    document.getElementById('temp').innerHTML = dataObject.temp + ' Celsius';
    document.getElementById('content').innerHTML = dataObject.content;
  } catch (error) {
    console.log('error: ', error);
  }
};


/* 
I was trying here to load countries-codes lookup table from assets/csvfiles/country_codes.csv 
and create a drop-menu with all countries listed 
then I would take these countries and convert them to their corresponding country-code
and pass it with the URL alongside Zipcode.
But unfortunately, I can not seem to import an module here. So I will leave it for the timebeing as a
#TODO - countries drop-menu

Another features that are considered to be added
#TODO - Temperature units menu
*/

// import parse from 'csv-parse/lib/sync.js';
// import {readFileSync} from 'fs';
// import {fs, parse} from '../server.js'
// import * as path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// console.log(__dirname);


// /* Path vars*/
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const csvfilePath = path.join(__dirname, 'assets', 'csvfiles', 'country_codes.csv');

// let readfileAsJson = (csvfilePath) => {
//   const recordsJSON = parse(readFileSync(filePath, 'utf8'), {
//     columns: true,
//     skip_empty_lines: true
//   });
//   return recordsJSON;
// } 

// let jsonToDict = (recordsJSON) => {
//   let countryCodeLookUp = {};
//   for (let i=0; i<recordsJSON.length; i++) {
//     countryCodeLookUp[recordsJSON[i].Name] = recordsJSON[i].Code;
//   }
//   return countryCodeLookUp;
// }

// let createCountriesMenu = () => {
//   recordsJSON = readfileAsJson(csvfilePath);
//   // countryCodeLookUp = jsonToDict(recordsJSON);

//   let selectList = document.getElementById("country");

//   for (let i=0; i<recordsJSON.length; i++) {
//     selectList.innerHTML += `<option value="${recordsJSON[i].Name}">${recordsJSON[i].Name}</option>`
//   }
// }
// // console.log('app.js is running!');
// // createCountriesMenu();

// document.addEventListener('DOMContentLoaded', (event) => {
//   console.log('DOM is fully loaded!');
// })