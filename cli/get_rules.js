const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');

const rulesFileName = __dirname + "/rules.json";

const file = fs.createWriteStream(rulesFileName);
https.get("https://files.ontario.ca/apps/verify/verifyRulesetON.json", function(response) {
  response.pipe(file);
  response.on('end', () => {
      if (response.statusCode === 200) {
        console.log("Rules retrieved.");
      } else {
        console.log("Http error.");
      }
  });
});
