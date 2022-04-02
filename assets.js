import * as fs from 'fs-extra';

const origin = './src/assets';
const target = './public/assets';

fs.copy(origin, target, (err) => {
  if (err) {
    console.log('An error occured while copying the folder.');
    return console.error(err);
  }
  console.log('Copy completed!');

  return true;
});
