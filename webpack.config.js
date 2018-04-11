var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: ['./src/js/main.js', './src/sass/main.scss'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use:  ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { minimize: true } },
                        { loader: 'sass-loader'}
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin
        ({ // define where to save the file
            filename: 'main.min.css',
            allChunks: true
        }),
        new UglifyJsPlugin()
        ]
};