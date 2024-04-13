const fs = require("fs");
const superagent = require('superagent');                     // ! npm init ->  npm install superagent           Superagent send HTTP request

fs.readFile(`${__dirname}/breed.txt`, 'utf-8', (error, data) => {
    console.log(data);

    // // ! Fetch
    // fetch(`https://dog.ceo/api/breed/${data}/images/random`)
    //     .then(response => response.json())
    //     .then(data => console.log(data));

    // // ! Superagent (Doing Http request same as fetch)
    // superagent
    //     .get(`https://dog.ceo/api/breed/${data}/images/random`)
    //     .end((error, response) => {
    //         if (error) return console.log(error.message);   // Todo: return  yazmasaq error verse bele asagilarida oxuyacaq
    //         console.log(response.body);
    //         // ! Send Breed to another file
    //         fs.writeFile('./dog.txt', response.body.message, (error, data) => {
    //             if (error) return console.log(error.message);
    //             console.log('Data Succesfully added to Dog.txt');
    //         })
    //     });

    // ! Superagent (Bit different)
    superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
        .then(response => {
            console.log(response.body);
            fs.writeFile('./dog.txt', response.body.message, (error, data) => {
                if (error) return console.log(error.message);
                console.log('Data Succesfully added to Dog.txt');
            });
        })
        .catch(error => {
            console.log(error.message);
        });
});