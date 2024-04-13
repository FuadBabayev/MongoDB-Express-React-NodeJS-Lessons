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
        const data = await readFilePro(`${__dirname}/breed.txt`);

        const responseA = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const responseB = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const responseC = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const responseD = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const responseE = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const responseALL = await Promise.all([
            responseA,
            responseB,
            responseC,
            responseD,
            responseE,
        ]);
        // console.log(responseALL);      // ! [ Response {}]
        const images = responseALL.map((promise) => promise.body.message);
        console.log(images); // [ 'https://images.dog.n02099849_3289.jpg', 'https://images.dog.n02099601_3202.jpg', 'https://images.dogn02099267_5587.jpg'  ]

        await writeFilePro('./dog.txt', images.join('\n'));
        console.log('Random dog images saved to file!');
    } catch (error) {
        console.log(error);
        throw error;
    }
    return '2: READY 🐶'
}

getDogpic();

