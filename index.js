import fs from 'fs';
import inquirer from 'inquirer';
import qr from 'qr-image';

inquirer
  .prompt([
    {
      message: "Type in your URL: ",
      name: "URL"
    }
  ])
  .then((answers) => {
    const url = answers.URL;

    // Generate QR code image
    const qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('url_qr.png'));

    // Write url to txt file
    fs.writeFile("url.txt", url, (err) => {
      if (err) throw err;
      console.log("The file has been saved successfully");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
