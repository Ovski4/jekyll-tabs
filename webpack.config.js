const path = require('path');

module.exports = {
    entry: './js/jekyllTabs.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts'],
    },
    output: {
        filename: 'tabs.js',
        path: path.resolve(__dirname, 'docs'),
        library: {
            name: 'jekyllTabs',
            type: 'umd',
        },
    },
    mode: 'production',
};
