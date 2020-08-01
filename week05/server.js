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
        res.end(`<html a=aa b='bb' c="cc" >
    <head name='nn'>
    <title>Document</title>
    <style>
        body div #myid {
            width:100px;
            background-color:#ff5000;
        }
        body div img {
            width: 30px;
            background-color:#ff1111;
        }
    </style>
    </head>
    <body>
    <div id="test">
        <img id="myid">123123</img>
        <img src="src123"/>
    </div>
    </body>
</html>`);
    })
}).listen(8000);

console.log('server started');