const path = require('path');
module.exports = {
    entry: {
        main: './src/test.ts',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {

                test: /\.(png|svg|jpg|jpeg|gif)$/i,

                type: 'asset/resource',

            },
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    watch: true
}