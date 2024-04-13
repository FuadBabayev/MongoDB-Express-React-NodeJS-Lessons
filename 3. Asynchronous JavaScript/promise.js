const fs = require("fs");
const superagent = require('superagent');


// // ! Read File
// const readFilePro = (file) => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(file, 'utf-8', (error, data) => {
//             if (error) reject('I could not found this file 🫣');
//             resolve(data);
//         });
//     });
// }

// readFilePro(`${__dirname}/breed.txt`)
//     .then(data => {
//         console.log(`Breed: ${data}`);
//         superagent
//             .get(`https://dog.ceo/api/breed/${data}/images/random`)
//             .then(response => {
//                 console.log(`Image URL: ${response.body.message}`);
//                 fs.writeFile('./dog.txt', response.body.message, (error, data) => {
//                     if (error) return console.log(error.message);
//                     console.log('Data Succesfully added to Dog.txt');
//                 });
//             })
//     })
//     .catch((error) => {
//         console.log(error)
//     });


// // ! Read and Write File (Nested)
// const writeFilePro = (path, text) => {
//     return new Promise((resolve, reject) => {
//         if (!text.length) return reject('There is no data included');
//         fs.writeFile(path, text, 'utf-8', (error) => {
//             if (error) reject('I could not found this file 🫣');
//             resolve(text);
//         });
//     });
// }

// writeFilePro(`${__dirname}/breed.txt`, 'labrador')
//     .then(data => {
//         console.log(`Breed: ${data}`);
//         return superagent
//             .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     })
//     .then(response => {
//         console.log(`Image URL: ${response.body.message}`);
//         fs.writeFile('./dog.txt', response.body.message, (error) => {
//             if (error) return console.log(error.message);
//             console.log('Data Succesfully added to Dog.txt');
//         });
//     })
//     .catch((error) => {
//         console.log(error.message)
//     });




// ! Read and Write File (Nested)
const writeFilePro = (path, text) => {
    return new Promise((resolve, reject) => {
        if (!text.length) return reject('There is no data included');
        fs.writeFile(path, text, 'utf-8', (error) => {
            if (error) reject('I could not found this file 🫣');
            resolve(text);
        });
    });
}

writeFilePro(`${__dirname}/breed.txt`, 'labrador')
    .then(data => {
        console.log(`Breed: ${data}`);
        return superagent
            .get(`https://dog.ceo/api/breed/${data}/images/random`)
    })
    .then(response => {
        console.log(`Image URL: ${response.body.message}`);
        fs.writeFile('./dog.txt', response.body.message, (error) => {
            if (error) return console.log(error.message);
            console.log('Data Succesfully added to Dog.txt');
        });
    })
    .catch((error) => {
        console.log(error.message)
    });
