const axios = require('axios');
const fs = require('fs');


function getImage() {
  // Define the base URL and your API key
  const baseURL = 'https://api.unsplash.com';
  const accessKey = 'CmaQkm84EGFGLYQmrLOwDOWwzzAL8sqoXHORc4bIxT0';

  // Make a GET request to the Unsplash API
  axios.get(`${baseURL}/search/photos`, {
    params: {
      query: 'hawamahal',
      per_page: 50, // Number of results per page
      client_id: accessKey, // Include your access key
    }
  })
    .then(response => {
      // Handle the successful response
      fs.writeFile("images.json", JSON.stringify(response.data), (err) => {
        if (err) {
          console.log(err);
        }
      })
    })
    .catch(error => {
      // Handle any errors
      console.error('Error:', error);
    });

}

getImage();