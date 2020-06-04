const http = require('http');
const url = require('url');
const fs = require('fs');
const replaceTemplate = require(`${__dirname}/starter/modules/replaceTemplate.js`);
///////////////////////////////
// Server
const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/overview.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/product.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/card.html`,'utf-8');

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req,res) => {
    const { query , pathname : pathName} = url.parse(req.url, true);
    console.log(pathName);
    if (pathName === '/' || pathName === '/overview'){

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard,el)).join('');
        const data = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
        res.end(data);
    }else if (pathName === '/product'){
        const productDataHtml = dataObj[query.id];
        const productData = replaceTemplate(tempProduct,productDataHtml);
        res.end(productData);
    }else if (pathName === '/api'){
        res.writeHead(200, {
            'content-type' : 'application/json'
        });
        res.end(data);
    }else {
        res.writeHead(400, {
            'content-type' : 'text/html'
        });
        res.end('<h1>page not found!</h1>');
    }
    
});
server.listen(8000,'127.0.0.1', () => {
    console.log('listening on port 8000.')
})