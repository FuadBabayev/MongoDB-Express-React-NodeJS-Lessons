const fs = require('fs');
const http = require('http');

// Todo: createServer accep Callback function (Synchronously)
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
// const productData = JSON.parse(data);

const server = http.createServer((request, response) => {
    // console.log(request);        // { url: '/', method: 'GET', statusCode: null, statusMessage: null ... }
    // console.log(response);       // { url: '/', method: 'GET', statusCode: null, statusMessage: null ... }
    const path = request.url;
    if (path === '/' || path === '/overview') response.end('This is the OVERVIEW');
    else if (path === '/product') response.end('This is the PRODUCT');
    else if (path === '/api') {
        response.writeHead(200, { 'Content-type': 'application/json' });
        if (data) response.end(data);
        response.end('This is the API page. If you see this message you probably have some problem with fetching data');
    }
    else {
        response.writeHead(404, { 'Content-type': 'text/html', 'my-own-header': 'Hello-world' });
        response.end(`<h1>Page not Found!</h1>`);
    }
});

server.listen(8000, '127.0.0.1', () => { console.log('Listening to request on port 8000') });



// ! Default yazilisi usulu beledir
// http.createServer(function (request, response) {
//     if (request.url === '/') {
//         response.writeHead(200, {
//             'Content-type': 'application/json',
//         });
//         response.end('This is the MAIN PAGE');
//     }
//     else {
//         response.writeHead(404, {
//             'Content-type': 'text/html',
//             'my-own-header': 'Hello-world',
//         });
//         response.end(`<h1>Page not Found!</h1>`);
//     }
// }).listen(8000, '127.0.0.1', () => { console.log('Listening to request on port 8000') });