let https = require('https');

let fs = require('fs');
fs.readFile('ip-subset.txt', (err, data) => {
  if (err) throw err;
  
  let countries = new Map();

  // IP API Promise Array
  let ipPromises = [];
  let array = data.toString().split("\n");

  for (i in array) {
    ipPromises[i] = new Promise((resolve, reject) => {
      https.get('https://ipapi.co/' + array[i]
              + '/country_name/', (resp) => {
                let body = '';
                
                resp.on('data', (data) => {
                  body += data;
                });

                resp.on('end', () => {
                  if (countries.has(body)) {
                    countries.set(body, countries.get(body) + 1);
                  } else {
                    countries.set(body, 1);
                  }
                });

                resolve();
      });
    });
  }

  Promise.all(ipPromises).then(() => {
    console.log(countries.size);
    countries.forEach((frequency, country, countries) => {
      console.log(country + ": " + countries.get(country));
    });
  });


});
