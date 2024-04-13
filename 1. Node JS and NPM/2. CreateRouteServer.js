const fs = require('fs');
const http = require('http');       // ! Web Server yaratmaq ucun import etmeliyik (gives Networking capability)

// Todo: createServer accep Callback function (Asynchronously)
const server = http.createServer((request, response) => {
    // console.log(request);                                 // * Browserde refresh verende coxlu datalar cixir 
    console.log(request.url);                                // * Browserde refresh verenden sonra URL-e 2 defe request edir 1. /       2. /favicon.ico cixir
    // ! Routing
    const path = request.url;
    if (path === '/' || path === '/overview') response.end('This is the OVERVIEW');         // * send back a response to the client (Ekrana yazdirir)
    else if (path === '/product') response.end('This is the PRODUCT');
    else if (path === '/api') {
        // ! Direction yerinde . (noqte) olmaqi prablem yarada biler cunki fayl harda olsa . hemin yeri (HOME) gosterir. Point . yerine ${__dirname} yaz
        fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (error, data) => {                    // * http://127.0.0.1:8000/api bu sehifede olanda gosterecek
            const productData = JSON.parse(data);               // console.log(productData); Terminalda butun JSON icindeki datalari gosterecek
            response.writeHead(200, {
                'Content-type' : 'application/json',                                    // Todo: JSON gonderende 'application/json'
            });
            response.end(data);                                         // ! Butun datalari JSON formatda http://127.0.0.1:8000/api gosterdi
        });
        // response.end('This is the API');                              // ! Bunu yazdiqimiz ucun ancaq bunu gosterirdi cunki her sehife ucun 1 response.end() isleyir
    }
    else {
        // ! HTTP Header is a piece of information about response that we are sending back (Sira her zaman bele olamlidir .writeHead(statusCode, {}) sonra .end())
        // * Eger sehife sehv girilse GET http://127.0.0.1:8000/randomName 404 (Not Found)
        response.writeHead(404, {                                                // * Status 404 olanda Yaratdiqimiz propertieler Network -> Headers icinde gorsenir
            'Content-type': 'text/html',                                         // Todo: TEXT gonderende 'text/html'
            'my-own-header': 'Hello-world',
        });
        response.end(`<h1>Page not Found!</h1>`);
    }
});

// ! server.listen accept 3 parameter: 1. port (:8000)   2. local host (127.0.0.1)   3. Callback (optional)
// Todo: Bundan sonra etmeli olduqumuz: npx nodemon "2. CreateServer.js" ->  Open in browser http://127.0.0.1:8000/        (nodemonla ayaqa qaldirmasaq islemez)
// * REQUEST
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000');           // * Terminala yazdirir
});



// ! API is a service which we can request some data