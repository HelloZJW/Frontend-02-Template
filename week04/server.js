const http = require('http');

http.createServer((req, res) => {
    let body = [];
    req.on('error', (err) => {
        console.log(err);
    }).on('data', (chunk) => {
        body.push(chunk.toString());
    }).on('end', () => {
        console.log(JSON.stringify(body));
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<html>
    <head>
    <title>Document</title>
    </head>
    <body>
    <div id="123">
        <span>123123</span>
    </div>
    </body>
</html>`);
    })
}).listen(8000);

console.log('server started');