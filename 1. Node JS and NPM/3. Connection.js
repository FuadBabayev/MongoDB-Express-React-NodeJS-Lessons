const fs = require('fs');           // ! fs File System bu mutleq burada yazilmalidirki asagidaki prosesler islesin
const http = require('http');       // ! Web Server yaratmaq ucun import etmeliyik (gives Networking capability)
    
// * Fuhnksiyanin qisa ozeti: (template) -> card/index.html, (product) -> JSON-dan gelen {} => templatenin icindeki {%PRODUCTNAME%}-ni product.prodcutName ile deyis
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
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

    return output;
}

// ! Requestleri http.createServer() icinde yazsaydiq coxlu request gederdi BLock veziyyet (sonraki evvelkini tamamlanmaqini gozlemeli idi)
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productData = JSON.parse(data);

const overview = fs.readFileSync(`${__dirname}/templates/index.html`, 'utf-8');
const product = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const card = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');

const server = http.createServer((request, response) => {
    const path = request.url;

    // * OVERVIEW Page
    if (path === '/' || path === '/overview') {
        response.writeHead(200, {
            'Content-type' : 'text/html',
        });
        const cardHtml = productData.map((item) => replaceTemplate(card, item)).join('');       // console.log(cardHtml); // card/index.html datalarla dolur
        console.log(cardHtml);
        const output = overview.replace(/{%PRODUCT_CARDS%}/g, cardHtml);
        // response.end(overview);
        response.end(output);
    }

    // * PRODUCT Page
    else if (path === '/product') response.end(product);

    // * API Page
    else if (path === '/api') {
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