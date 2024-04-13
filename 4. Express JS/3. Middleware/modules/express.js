const express = require('express');
const app = express();
const port = 3000;

// ! Similar with NodeJS Routing with some method name changing  get === http,  send === end, end == json
// ! GET
app.get('/', (request, response) => {
    // response.status(200);                               // Yazmasanda default olarq 200 codu kimi gelecek
    // response.send('Hello from the server side!');       // NodeJS http(routing) kimi eyni seydir ve bu hisse olmasa acmiyacaq
    response
        .status(200)
        .json({
            app: "Natours",
            message: 'Hello from the server side!',
        });
});

// ! POST
app.post('/', (request, response) => {
    response
        .status(201)
        .send('You can POST to this endpoint...')
});


// ! LISTEN
app.listen(port, () => {
    console.log(`App running on port ${port}...`);      // 127.0.0.1:3000/ or 127.0.0.1:3000 bu portu POSTMAN-da GET et, Browserde de olar
});