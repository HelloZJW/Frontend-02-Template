let http = require("http");
let fs = require("fs");
let archiver = require("archiver");
let child_process = require("child_process")
let querystring = require("querystring");


child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.8c0f8ea0d30717f0`, (err, stdout, stderr) => {
    console.log("error");
});

http.createServer(function (req, res) {

    let query = querystring.parse(req.url.match(/^\/\?([\s\S]+)$/)[1]);
    publish(query.token);

}).listen(3002);

function publish(token) {
    fs.stat("./sample", (error, states) => {
        let request = http.request({
            hostname: "127.0.0.1",
            port: "3001",
            method: "POST",
            path: "/publish?token=" + token,
            headers: {
                "Content-Type": "application/octet-stream",
            }
        }, resp => {
            console.log(resp);
        });

        const archive = archiver('zip', {
            zlib: { level: 9 } 
        });

        console.log(JSON.stringify(states));

        archive.directory("./sample/", false);

        archive.finalize();

        archive.pipe(request);
        // archive.pipe(fs.createWriteStream("temp.zip"))
    });

}