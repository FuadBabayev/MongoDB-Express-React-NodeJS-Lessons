const http = require('http');
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// // Todo: Observer
// myEmitter.on('newSale', () => console.log('There was a new sale!'));
// myEmitter.on('newSale', () => console.log('Costumer name: Jonas'));
// // Todo: Emitter
// myEmitter.emit('newSale');                                              // ! myEmitter.on('newSale', ...) olani gosterir

// myEmitter.on('newCount', (stock) => console.log(stock));
// myEmitter.emit('newCount', 777);

// // ! Class based
// class Sales extends EventEmitter {
//     constructor() {
//         super()
//     }
// }
// const latestSale = new Sales();
// latestSale.on('newSale', () => console.log('There was a new sale!'));
// latestSale.on('newSale', () => console.log('Costumer name: Jonas'));
// latestSale.emit('newSale');
// latestSale.on('newCount', (stock) => console.log(stock));
// latestSale.emit('newCount', 777);


// ! Crate web server (listening for an event)
const server = http.createServer();
server.on('request', (request, response) => { console.log('Request received!'); console.log(request.url); response.end('Request received') });
server.on('request', (request, response) => console.log('Another Request received!'));
server.on('close', () => console.log("Server Closed"));
server.listen(8000, '127.0.0.1', () => console.log('Waiting for Request...'))