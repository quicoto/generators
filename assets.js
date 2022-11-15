import * as fs from 'fs-extra';

fs.copy('./reviews/src/assets', './public/reviews/assets', (err) => {
  if (err) {
    console.log('An error occured while copying the folder.');
    return console.error(err);
  }
  console.log('Copy completed!');

  return true;
});

fs.copy('./gists/src/assets', './public/gists/assets', (err) => {
  if (err) {
    console.log('An error occured while copying the folder.');
    return console.error(err);
  }
  console.log('Copy completed!');

  return true;
});
