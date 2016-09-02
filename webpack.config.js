var path = require('path');
var webpack = require('webpack');

module.exports = {

    // ให้ webpack เริ่มรวมโค้ดที่ไฟล์ client.js
    entry: {
        bundle: path.resolve(__dirname, 'src/js/client.js'),
        //facebook: path.resolve(__dirname, 'src/js/facebook-init.js'),
    },

    // แล้วตั้งชื่อไฟล์ output ว่า bundle.js
    output: {
        path: path.resolve(__dirname, 'public/js'),
        //filename: 'bundle.js'
        filename: "[name].js"
    },

    // อ่านไฟล์นามสกุล .js, .jsx ด้วย Babel
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};
