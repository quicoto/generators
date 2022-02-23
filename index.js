const fs = require('fs');

// Create the requried folders
fs.mkdir(`./public`, () => {});

function createFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (!err) {
      console.log('File created: ' + fileName);
    }
  });
}

createFile('./public/index.html', 'Hello World')