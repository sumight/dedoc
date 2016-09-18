var path = require('path');

module.exports = {
    entry: {
        main: 'index.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'dedoc.js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url'
        }, {
            test: /\.(woff|woff2|svg|eot|ttf|svg|eot)$/,
            loader: 'url'
        }]
    },
    resolve: {
        root: [
            path.resolve(__dirname),
            path.resolve(__dirname, 'js')
        ],
        extensions: [
            '',
            '.js',
            '.css'
        ],
        alias: {
            "highlight.css":'highlight.js/styles/atelier-cave-dark.css'
        }
    }
};
