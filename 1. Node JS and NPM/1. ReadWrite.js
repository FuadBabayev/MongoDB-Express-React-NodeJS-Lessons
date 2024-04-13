const fs = require('fs');           // ! fs File System bu mutleq burada yazilmalidirki asagidaki prosesler islesin

// Todo: 1. Synchronous way (Blocking) is basically processed one after another, line by line
// ! Read data (Synchronously). ReadFileSync takes 2 arguments: 1. path (the file reading) 2. character encoding (utf-8)
// * Sinxron islediyi ucun evvelki bitib tam yuklenmeden sonrakina kecmiceyecek ve neticede prablem yaradir
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);         // The avocado 🥑 is popular in vegetarian cuisine as a ... its high fat content 😄

// ! Write data (Synchronously). ReadFileSync takes 2 arguments: 1. path (the file to pass) 2. data to send
const textOut = `This is what we know about the avocado: ${textIn}\nCreated at: ${new Date().toUTCString()}`;    /* OR // ! 'This is: ' + textIn */
fs.writeFileSync('./txt/output.txt', textOut);       // if file path exist -> add, if not -> create and add datas and actually it now retrun someting it just proceed
console.log('File written succesfully');



// Todo: 2. Asynchronous way (Non-Blocking) is basically processed one after another, line by line
// ! Read data (Asynchronously). WARNING: in Node Js it is typicall to be first parametr of callback function must be ERROR
// * Asinxron islediyi ucun evvelki bir birlerini gozlemeden isleyecekler
fs.readFile('./txt/start.txt', 'utf-8', (error, data) => {
    console.log(`№2 Error: ${error}        Data: ${data}`);         // Error: null     Data: read-this
});
console.log('№1 Will read file');         // ! Terminalda yuxaridakindan daha evvel bu hisse isleyecek asinxron olduqu ucun

// * readFile and writeFile together (CallBack Hell)
fs.readFile('./txt/start.txt', 'utf-8', (error1, data1) => {
    console.log('№2 ' + error1, data1);   // Error: null     Data: read-this
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (error2, data2) => {
        console.log('№3 ' + error2, data2);
        fs.readFile(`./txt/append.txt`, 'utf-8', (error3, data3) => {
            console.log('№4 ' + error3, data3);
            fs.writeFile('./txt/final.txt', `${data1}\n${data2}\n${data3}`, (error4) => {          // ! We wrote just 1 parametr beacuse we dont have data to pass
                console.log('Your file has been written');
            });
        })
    })
});
console.log('№1 Starting to read....');