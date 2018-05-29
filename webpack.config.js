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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader?url=false', options: {minimize: true}},
                        {loader: 'sass-loader'},
                        {loader: 'image-webpack-loader', options: {bypassOnDebug: true}}
                    ]
                })
            },
            // {
            //     test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            //     use: ExtractTextPlugin.extract({
            //         use: [
            //             {loader: 'url-loader',  options: {limit: 8192}}
            //         ]
            //     })
            // },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
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