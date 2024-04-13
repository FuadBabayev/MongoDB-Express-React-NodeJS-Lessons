const fs = require('fs');           // ! fs File System bu mutleq burada yazilmalidirki asagidaki prosesler islesin
const http = require('http');       // ! Web Server yaratmaq ucun import etmeliyik (gives Networking capability)
const url = require('url');         // ! Routing etmek ucun istifade olunur (React Router)

const replaceTemplate = (template, product) => {
    let output = template
        .replace(/{%PRODUCTNAME%}/g, product.productName)
        .replace(/{%IMAGE%}/g, product.image)
        .replace(/{%PRICE%}/g, product.price)
        .replace(/{%FROM%}/g, product.from)
        .replace(/{%NUTRIENTS%}/g, product.nutrients)
        .replace(/{%QUANTITY%}/g, product.quantity)
        .replace(/{%DESCRIPTION%}/g, product.description)
        .replace(/{%ID%}/g, product.id);
    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productData = JSON.parse(data);

const overview = fs.readFileSync(`${__dirname}/templates/index.html`, 'utf-8');
const product = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const card = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');

const server = http.createServer((request, response) => {
    // console.log(request);                            // !   All Node JS properties: { url: '/',  method: 'GET',  statusCode: null,  statusMessage: null ... }
    // console.log(request.url);                        // !   { url: '/' } =>  /
    // console.log(url);                                // !   { Url: [Function: Url], format: [Function: urlFormat], URLSearchParams: [class URLSearchParams] ... }
    // console.log(url.parse(request.url, true));       // !   Url { protocol: null, port: null, query: [Object: null prototype] {}, pathname: '/' }

    // ! url.parse(path, ture)
    const { query, pathname } = url.parse(request.url, true);   // console.log(query, pathname);
    // const path = request.url;                              // ! artiq bunun evezine {query, pathname} istifade edecik

    // * OVERVIEW Page
    if (pathname === '/' || pathname === '/overview') {
        // ! writeHead Adindan gorunduyu kimi basda yazmalisan
        response.writeHead(200, {
            'Content-type': 'text/html',
        });
        // const cardHtml = productData.map((item) => replaceTemplate(card, item));         // console.log(cardHtml); // ! Bu halda array kimi olacaq
        const cardHtml = productData.map((item) => replaceTemplate(card, item)).join('');   // console.log(cardHtml); // ! Bu halda string kimi olacaq
        const output = overview.replace(/{%PRODUCT_CARDS%}/g, cardHtml);
        response.end(output);
    }

    // * PRODUCT Page
    else if (pathname === '/product') {
        response.writeHead(200, {
            'Content-type': 'text/html',
        });
        const queryProduct = productData.find((item) => item.id == query.id);
        const productHtml = replaceTemplate(product, queryProduct);
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


