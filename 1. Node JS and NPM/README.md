### NODE JS (Single Thread)
`Node Js` is a JavaScript runtime (environment), built on Google's open source `V8` JavaScript engine.
`Node JS` Google-un açıq mənbəli `V8` JavaScript mühərrikində qurulmuş JavaScript işləmə vaxtıdır.
`JavaScript` ucun Browser-in **console.log()**-u `Node JS` ucun Terminal-in **node**-u.

# Node.js REPL (Read Eval Print Loop)  in Node.js App
`node   ` Take you to REPL. Start you coding. You can write whatever you want same with JavaScript   
`.break ` Sometimes you get stuck, this gets you out
`.clear ` Alias for .break
`.editor` Enter editor mode
`.exit  ` Exit the REPL also you can write `Ctrl + c` twice or `Ctrl + d` once
`.help  ` Print this help message
`.load  ` Load JS from a file into the REPL session
`.save  ` Save all evaluated commands in this REPL session to a file
`press TAB` Shows all kinds of staffs that are available in Node JS
`String. + TAB` Shows all kinds of staffs that are available in String (you can write other properties Number and etc.)
`_` Shows previous value that you created (underscore) for ex. 7 => \_ + 3 = 10

# JavaScript filesini isletmek
1. Main root-da `index.js` yarat (index adi taninir deye onu bezen yazmasanda olar ve ya . ilede cagira bilersen)
2. Terminalda `node index.js` yazaraq hemin filenin ne xaric etdiyine bax (File-ye eger basqa ad versen hemin file adini yazmalisan)
3. `npx nodemon fileName.js` or just `npx nodemon .`

# Node JS commands
The built-in Node.js **file system(fs)** module helps us store, access, and manage data on our operating system. 
**const fs = require('fs');** Uses for Read and Write data from any kind of places
`fs.readFileSync('./path', 'utf-8')` Read datas from any place
`fs.writeFileSync('./path', data);` Write datas into place. If file path exist it automatically add datas, if not it creates and add datas
`fs.readFile('./path', 'utf-8', (error, data) => {})` Read datas from any place and accept callback first parameter alwayse error seonc data
`fs.writeFile('./path', data, (error, data) => {});` It is optional to write 'utf-8' as 3rd parametr (try not include)

**const http = require('http');** Gives Networking capability
```bash
const http = require('http');
http.createServer(function (request, response) {
    if (request.url === '/') {
        response.writeHead(200, {
            'Content-type': 'application/json',
        });
        response.end('This is the MAIN PAGE');
    }
    else {
        response.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'Hello-world',
        });
        response.end(`<h1>Page not Found!</h1>`);
    }
}).listen(8000, '127.0.0.1', () => { console.log('Listening to request on port 8000') });
```

**const url = require('url');** Routing etmek ucun istifade olunur (React Router)
```bash
const server = http.createServer((request, response) => {
    const {query, pathname} = url.parse(request.url, true);
});
```

### Node package manager (npm)
1. `npm init` or `npm init -y` Download package.json file
2. `npm install slugify` Download Slugify file and node_modules folder
3. `npm install nodemon --global` or `npm i nodemon -g` Download Nodemon tool Globally which are available in all folders of your Computer
4. `npm install nodemon --save-dev` Download Nodemon tool which automatically restarting Node application whenever changes happen **only in this project**
5. `nodemon fileName.js` or `nodemon + TAB` Open Nodemon ve nodemon sozunden sonra TAB-a bassan avtomatik bir bir getirecek lazim olan fileleri
6. `npm run start` or `npm run start` Avtomatik index.js filesini acacaq cunki package.json -> "scripts": { "start": "nodemon 'index.js'" }
7. Eger script/start-daki fileni tapmasa ozu ucun her zaman main icinde yazilan fileni root kimi goturecek
```bash
{
  "main": "4. URL.js",
  "scripts": {
    "start": "nodemon '6. slugify.js'"
  },
}
```

# Node JS Packages Versions and Update
`npm install` or `npm i` Download all node_modules folder with appropriate(files that exist in package.json) files
`"nodemon": "^3.1.0"` ^: Can be upgraded in the future 3: major version (huge changes) 1: minor version 0: patch version (bug fixes)
`npm install slugify@1.0.0` Download older version of slugify
`npm outdated` Show all outdated packages in table version (If outdated exist)
`npm update outdatedPackage` Update package that is in older version
`npm uninstall packageName` Uninstall package

# Setting up Prettier in VSCode
1. `Prettier - Code formatter` Download form VSCode Extension it automatically format code in HMTL/CSS/JS and etc..
2. `Manage -> Settings or Ctrl + , -> Search for format on save` and set checked Editor: Format On Save (Save eden kmi avtomatik Prettier oz isini gorecek)
3. Create `.prettierrc` file and fill it with below then when you need clean code press **ctrl + s**
```bash
{
    "singleQuote": true,
    "printWidth": 80,
    "tabWidth": 2
}
```



