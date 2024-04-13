const fs = require('fs');                               // ! fs File System bu mutleq burada yazilmalidirki asagidaki prosesler islesin
const http = require('http');                           // ! Web Server yaratmaq ucun import etmeliyik (gives Networking capability)
const url = require('url');                             // ! Routing etmek ucun istifade olunur (React Router)
const slugify = require('slugify');                     // ! Convert url into your wanting url
const converter = require('./module/replaceTemplate');  // ! convert with replaceTemplate = (template, product) => {}

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productData = JSON.parse(data);
const overview = fs.readFileSync(`${__dirname}/templates/index.html`, 'utf-8');
const product = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const card = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');

const slugs = productData.map(product => slugify(product.productName, {
    lower : true
}));
// console.log(productData); // !  [{id: 2, name: 'Apollo' }, { id: 3, name: 'Carrots', }, { id: 4, name: 'Corncobs'}]
// console.log(slugs);       // !  [ 'fresh-avocados', 'goat-and-sheep-cheese', 'apollo-broccoli', 'baby-carrots', 'sweet-corncobs' ]

const server = http.createServer((request, response) => {
    const { query, pathname } = url.parse(request.url, true);
    // * OVERVIEW Page
    if (pathname === '/' || pathname === '/overview') {
        response.writeHead(200, {
            'Content-type': 'text/html',
        });
        const cardHtml = productData.map((item) => converter(card, item)).join('');
        const output = overview.replace(/{%PRODUCT_CARDS%}/g, cardHtml);
        response.end(output);
    }
    // * PRODUCT Page
    else if (pathname === '/product') {
        response.writeHead(200, {
            'Content-type': 'text/html',
        });
        const queryProduct = productData.find((item) => item.id == query.id);
        const productHtml = converter(product, queryProduct);
        response.end(productHtml);
    }
    // * API Page
    else if (pathname === '/api') {
        response.writeHead(200, { 'Content-type': 'application/json' });
        if (data) response.end(data);
        response.end('This is the API page. If you see this message you probably have some problem with fetching data');
    }
    // * NOT FOUND
    else {
        response.writeHead(404, { 'Content-type': 'text/html', 'my-own-header': 'Hello-world' });
        response.end(`<h1>Page not Found!</h1>`);
    }
});

server.listen(8000, '127.0.0.1', () => { console.log('Listening to request on port 8000') });

    

