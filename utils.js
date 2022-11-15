import fs from 'fs-extra';

export function createFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (!err) {
      const targetContent = fs.readFileSync(fileName, 'utf-8');

      console.log('File created: ' + fileName);

      fs.writeFileSync(fileName, targetContent.replaceAll('%VERSION%', process.env.npm_package_version));
    }
  });
}

export function readFile(path) {
  return fs.readFileSync(path, { encoding:'utf8', flag:'r'});
}