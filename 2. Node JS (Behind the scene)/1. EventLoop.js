// ! Node JS Architecture have 2 fundamental parts Thread Pool(Default size is 4) and Event Loop
const fs = require('fs');
const crypto = require('crypto');
const start = Date.now();


// ! Biz istenilen an size of Thread pool-u deyise bilerik (Yeni eyni anda isleyen threadlarin sayini 2-e salaq)
process.env.UV_THREADPOOL_SIZE = 1;

setTimeout(() => console.log('TimeOut Finished'), 0);                                   // ! 3. TimeOut Finished
setImmediate(() => console.log('Immediate Finished'));                                  // ! 4. Immediate Finished
console.log(fs.readFileSync('./text.txt', 'utf-8'));                                    // ! 1. Hello World
console.log('Console');                                                                 // ! 2. Console

// Todo: After first console, 3 output come without any particular order (actually one-by-one) because this code is not in InputOutput(I/O) cycle
setTimeout(() => console.log('TimeOut Finished'), 0);                                   // ! 2. TimeOut Finished 
setImmediate(() => console.log('Immediate Finished'));                                  // ! 3. Immediate Finished
fs.readFile(`${__dirname}/text.txt`, 'utf-8', (_, data)=> console.log(data));           // ! 4. Hello World
console.log('Console');                                                                 // ! 1. Console

// Todo: In InputOutpu(I/O) cycle                       Keep in mind in I/O cycle:  process.nextTick() > setImmediate() > setTimeout()
setTimeout(() => console.log('TimeOut Finished'), 0);                                   // ! 2. TimeOut Finished 
setImmediate(() => console.log('Immediate Finished'));                                  // ! 3. Immediate Finished
fs.readFile(`${__dirname}/text.txt`, 'utf-8', (_, data) => {
    console.log(data);                                                                  // ! 4. Hello World
    setTimeout(() => console.log('TimeOut Finished'), 0);                               // ! 7. TimeOut Finished 
    setTimeout(() => console.log('TimeOut Finished'), 5000);                            // ! 8. TimeOut Finished and only if times up => clean exit the application
    setImmediate(() => console.log('Immediate Finished'));                              // ! 6. Immediate Finished
    process.nextTick(() => console.log('Process nextTick'));                            // ! 5. Process nextTick
});
console.log('Console');                                                                 // ! 1. Console


// Todo: Default size of Thread pool is 4. Eyni anda 4 thread islediyi ucun her zaman 4-u bir-birine cox yaxin zamanda bas verir digerleri arasinda ferq daha coxdur
fs.readFile(`${__dirname}/text.txt`, 'utf-8', (error, data) => {
    // * crypto.pbkdf2(secret_string, secret_string_solver, number_of_iteration, keylength, callback)
    for(let i = 0; i < 12; i++){
        crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => console.log(Date.now() - start, 'Password encrypted'));
    }
    setTimeout(() => console.log('-----------------------'), 2000)
    setTimeout(() => console.log('-----------------------'), 4000)
});

// ! Bu halda artiq synchron ederek blokladiqimi ucun one-by-one davam edirler
fs.readFile(`${__dirname}/text.txt`, 'utf-8', (error, data) => {
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512'); console.log(Date.now() - start, 'Password encrypted');
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512'); console.log(Date.now() - start, 'Password encrypted');
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512'); console.log(Date.now() - start, 'Password encrypted');
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512'); console.log(Date.now() - start, 'Password encrypted');
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => console.log(Date.now() - start, 'Password encrypted'));
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => console.log(Date.now() - start, 'Password encrypted'));
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => console.log(Date.now() - start, 'Password encrypted'));
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => console.log(Date.now() - start, 'Password encrypted'));
    setTimeout(() => console.log('SetTimeout'), 0);
    process.nextTick(() => console.log('Process nextTick'));
    setImmediate(() => console.log('Immediate Finished'))
});