const fs = require("fs");
const superagent = require('superagent');

// ! Read File 
const readFilePro = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (error, data) => {
            if (error) reject('I could not found this file 🫣');
            resolve(data);
        });
    });
}

// ! Write File
const writeFilePro = (path, text) => {
    return new Promise((resolve, reject) => {
        if (!text.length) return reject('There is no data included');
        fs.writeFile(path, text, 'utf-8', (error) => {
            if (error) reject('I could not found this file 🫣');
            resolve(text);
        });
    });
}


readFilePro(`${__dirname}/breed.txt`)
    .then(data => {
        console.log(`Breed: ${data}`);
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    })
    .then(response => {
        console.log(`Image URL: ${response.body.message}`);
        return writeFilePro('./dog.txt', response.body.message);
    })
    .then(() => {
        console.log('Random dog image saved to file!');
    })
    .catch((error) => {
        console.log(error)
    });
