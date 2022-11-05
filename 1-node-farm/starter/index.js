const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');
const sluggedObj = require('./modules/sluggedObj');

const replaceTemplate = require('./modules/replaceTemplate');
////////////////////////////////////
// FILES
// Blocking, synchronous way
// const txtIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(txtIn);

// const txtOut = `This is what we know about the avocado: ${txtIn}.\nCreated this file on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', txtOut);
// console.log("Written to output.txt");

// Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//     if(err) return console.log('Error occurred!');
//    fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data1) => {
//     console.log(data1);
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.writeFile('./txt/final.txt', `${data1}\n${data2}`, 'utf-8', err => {
//             console.log('Data has been written to final.txt');
//         })
//     })
//    })
// });

////////////////////////////////////
// SERVER
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, {lower: true}));
console.log(slugs);

const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true);

    // Overview Page
    if(pathname === '/' || pathname === '/overview') {
        const cardHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml);
        
        res.writeHead(200, {
            'Content-type': 'text/html',
        });
        res.end(output);
    } 
    
    // Product Page
    else if(pathname === '/product') {
        res.writeHead(200, {
            'Content-type': 'text/html',
        });

        const productHtml = replaceTemplate(tempProduct , dataObj[query.id]);
        res.end(productHtml);
    } 
    
    // API Page
    else if(pathname === '/api') {
        res.writeHead(200, {
            'Content-type' : 'application/json',
        });
        res.end(data);
    } 
    
    // Not found Page
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
        });
        res.end('<h1>Page not found</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to server on port 8000');
});
