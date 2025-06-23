const request = require('request');

const API_URL = 'https://data.nayaone.com/green_bonds';
const API_KEY = process.env.NAYAONE_SANDBOX_API_KEY || 'your sandpit api key';

const options = {
  method: 'GET',
  url: API_URL,
  headers: {
    'Accept-Profile': 'api',
    'sandpit-key': API_KEY
  }
};

function fetchGreenBonds(callback) {
  request(options, function (error, response) {
    if (error) return callback(error);
    callback(null, response.body);
  });
}

// Example usage:
if (require.main === module) {
  fetchGreenBonds((err, data) => {
    if (err) throw err;
    console.log(data);
  });
}

module.exports = { fetchGreenBonds };