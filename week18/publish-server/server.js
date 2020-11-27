let http = require("http");
let https = require("https");
let unzipper = require("unzipper");
let querystring = require("querystring");


function auth(req, res) {
    let query = querystring.parse(req.url.match(/^\/auth\?([\s\S]+)$/)[1]);
    console.log(query);
    getToken(query.code, (info) => {
        res.write(`<a href='http://localhost:3002/?token=${info.access_token}'>publish</a>`);
        res.end();
    });
}

function getToken(code, callback) {
    let req = https.request({
        hostname: "github.com",
        path: `/login/oauth/access_token?code=${code}&client_id=Iv1.8c0f8ea0d30717f0&client_secret=eb1bf5569d27fba73a23f33b2f8617170f895e56`,
        method: "post",
        port: 443
    }, (res) => {
        let body = "";

        res.on('data', chunk => {
            body += chunk.toString();
        });

        res.on('end', chunk => {
            // console.log(body);
            let o = querystring.parse(body);
            callback(o);
        })
    });

    req.end();
}

function publish(req, res) {

    let query = querystring.parse(req.url.match(/^\/publish\?([\s\S]+)$/)[1]);

    getUser(query.token, info => {
        // console.log(info);
        req.pipe(unzipper.Extract({ path: '../server/public/' }));
        req.on('end', () => {
            res.end("Success");
        });

        req.on('error',(error)=>{
            console.log(error);
        })
    });
}


function getUser(token, callback) {
    let req = https.request({
        hostname: "api.github.com",
        path: `/user`,
        method: "get",
        port: 443,
        headers: {
            authorization: `token ${token}`,
            "User-Agent": "toy-publish"
        }
    }, (res) => {
        let body = "";

        res.on('data', chunk => {
            body += chunk.toString();
        });

        res.on('end', chunk => {
            // console.log(body);
            let o = querystring.parse(body);
            callback(o);
        })
    });

    req.end();
}


http.createServer(function (req, res) {
    if (req.url.match(/^\/auth\?/)) {
        return auth(req, res);
    } else if (req.url.match(/^\/publish\?/)) {
        return publish(req, res);
    }else {
        res.end("hello world!");
    }
}).listen(3001);