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

const getDogpic = async () => {
    try {
        // ! await in here stops the code from running at this point until this promise(readFilePro) is resolved
        const data = await readFilePro(`${__dirname}/breed.txt`);
        console.log(`Breed: ${data}`);

        const response = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(`Image URL: ${response.body.message}`);

        await writeFilePro('./dog.txt', response.body.message);
        console.log('Random dog image saved to file!');
    } catch (error) {
        console.log(error);
        throw error;
    }
    return '2: READY 🐶'
}
// console.log('1. Will get dog pics!');
// getDogpic();
// console.log('2. Done geting dog pics!');
// // 1. Will get dog pics!
// // 2. Done geting dog pics!
// // Breed: retriever
// // Image URL: https://images.dog.ceo/breeds/retriever-chesapeake/n02099849_2965.jpg
// // Random dog image saved to file!


// console.log('1. Will get dog pics!');
// console.log(getDogpic());
// console.log('2. Done geting dog pics!');
// // 1. Will get dog pics!
// // Promise { <pending> }
// // 2. Done geting dog pics!
// // Breed: retriever
// // Image URL: https://images.dog.ceo/breeds/retriever-flatcoated/n02099267_198.jpg
// // Random dog image saved to file!


console.log('1. Will get dog pics!');
getDogpic()
.then(show => {
    console.log(show);
    console.log('3. Done geting dog pics!');
})
.catch( err => console.log('ERROR 💥'))
console.log('2. Done geting dog pics!');
// 1. Will get dog pics!
// 2. Done geting dog pics!
// Breed: retriever
// Image URL: https://images.dog.ceo/breeds/retriever-chesapeake/n02099849_435.jpg
// Random dog image saved to file!
// 2: READY 🐶
// 3. Done geting dog pics!