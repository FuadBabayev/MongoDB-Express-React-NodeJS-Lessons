const fs = require('fs');
const http = require('http');

// ! Streams are used to process (read and write) data piece by piece (chunks), without completing the whole read or write operation, 
// ! and therefore without keeping all the data in memory. Streams are instances of the EventEmitter class
// Todo: Type of Streams: 1. Readable 2. Writable 3. Duplex 4. Transform

const server = http.createServer();
server.on('request', (request, response) => {
    // Todo: Solution 1: fs.readFile() Takes a lot of time because data is soo heavy
    // fs.readFile(`${__dirname}/tremendous.txt`, 'utf-8', (error, data) => {
    //     if(error) console.log(error);
    //     response.end(data);
    // });

    // // Todo: Solution 2: Streams consume piece by piece (chunk by chunk)
    // const readable = fs.createReadStream(`${__dirname}/tremendous.txt`);
    // readable.on('data', (chunk) => {
    //     response.write(chunk);
    // });
    // readable.on('end', () => {
    //     response.end();
    // });
    // readable.on('error', (error) => {
    //     console.log(error);
    //     response.statusCode = 500;
    //     response.end('File not Found');
    // });

    // Todo: Solution 3: Pipe way is more preferable
    const readable = fs.createReadStream(`${__dirname}/tremendous.txt`);
    readable.pipe(response);            // readableSource.pipe(writeableDest)
});

server.listen(8000, '127.0.0.1', () => console.log('Listening...'));