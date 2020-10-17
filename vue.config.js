const fs = require('fs');

var httpsConf = process.env.NODE_ENV !== 'production' ? {
    devServer: {
        https: true,
        key: fs.readFileSync('./localhost.key'),
        cert: fs.readFileSync('./localhost.crt')
    }
} : null;

module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    publicPath: './',
    ...httpsConf
};
