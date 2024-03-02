// /netlify/functions/api-proxy.js
// const fetch = require('node-fetch');

// exports.handler = async (event, context) => {
//   const response = await fetch('http://api.open-notify.org/iss-now.json?callback=?');
//   const data = await response.json();
//   return {
//     statusCode: 200,
//     body: JSON.stringify(data)
//   };
// };

// const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const API_ENDPOINT = 'http://api.open-notify.org/iss-now.json'; // Ensure this is your intended API

  try {
    const response = await fetch(API_ENDPOINT);
    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      console.error('API call failed:', response.status, response.statusText);
      throw new Error(`API call failed with status ${response.status}: ${response.statusText}`);
    }

    // Convert the response to text first to check what was received
    const text = await response.text();

    try {
      // Attempt to parse the text as JSON
      const data = JSON.parse(text);
      // Assuming data.iss_position contains the latitude and longitude
      if(data && data.iss_position) {
        console.log('Coordinates:', data.iss_position.latitude, data.iss_position.longitude);
        return {
          statusCode: 200,
          body: JSON.stringify({ lat: data.iss_position.latitude, lng: data.iss_position.longitude }),
          headers: { 'Content-Type': 'application/json' }
        };
      } else {
        throw new Error('Invalid JSON structure');
      }
    } catch (parseError) {
      // Log the error and the original text for debugging
      console.error('Error parsing JSON:', parseError);
      console.error('Original response text:', text);
      return { statusCode: 500, body: 'Server error: Invalid JSON response' };
    }
  } catch (error) {
    console.error('Server error:', error);
    return { statusCode: 500, body: `Server error: ${error.message}` };
  }
};
