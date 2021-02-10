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