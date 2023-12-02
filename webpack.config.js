const path = require('path');

module.exports = {
    entry: './js/jekyllTabs.js',
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
