const fs = require('fs');

// Read the contents of the JSON file
const data = fs.readFileSync('data.json');
// Parse the JSON data into a JavaScript object
const jsonData = JSON.parse(data);

console.log("Before Adding data",JSON.stringify(jsonData, null, 4));

// Modify the JavaScript object by adding new data
jsonData['description'] = "Hii"


// Convert the JavaScript object back into a JSON string
const jsonString = JSON.stringify(jsonData);

fs.writeFileSync('data.json', jsonString, 'utf-8', (err) => {
  if (err) throw err;
  console.log('Data added to file');
});

const update_data = fs.readFileSync('data.json');
const updated_jsonData = JSON.parse(update_data);
console.log("After Adding data",JSON.stringify(updated_jsonData, null, 4));