### Tools used

1. `npm init --yes` or `npm init -y`                     Download package.json
2. `npm i express`                                       Download ExpressJS 
3. `npm i mongoose`                                      Download Mongoose library
4. `npm i nodemon -D` or `npm i nodemon --save-dev`      Download Nodemon as dev dependecy
5. `npm i dotenv`                                        Download DotEnv to read all datas from .env file (bu olmasa process.env.DATABASE === undefined verir)
6. `npm i bcryptjs`                                      Download Bcrypt for hash(convert) password
7. `npm i express-async-handler`                         Download Express Error Handler
8. `npm i jsonwebtoken`                                  Download JSON Web Token (JWT). Token Based Authentication. JWT.IO allows you to decode, verify and generate JWT.
9. `npm install --save stripe`                           Download Stripe for any Purchasing processes
10. `"C:\Users\user\Downloads\stripe.exe" login`         Download Stripe CLI from Command Prompt [stripe === path]       https://docs.stripe.com/stripe-cli
11. `npm i multer cloudinary multer-storage-cloudinary`  Download Multer to configure our server to accept file upload, Cloudinary to save files into cloud area


### Main API: https://nodejs-ecommerce-api-usoh.onrender.com/api/v1/products

To make HTML documentation use, Write in Command Prompt: "C:\Users\user\Downloads\windows_amd64.exe" build -i ecommerce-api.json -o index.html 