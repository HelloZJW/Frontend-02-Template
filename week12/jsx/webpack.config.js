const path = require('path')
const webpack = require('webpack')
module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    mode: 'development', 
    module: {
        rules:[
            { test: /\.js$/, use: "babel-loader"},
        ]
    }
}