const webpackDevServer = require('webpack-dev-server');
const webpackH5Config = require('../config/h5/webpack.config.js');
let app;
const PORT = 8080;
const getPort = require('get-port');

module.exports = async function(compiler) {
    if (!app) {
        const port = await getPort({
            port: PORT
        });
        app = new webpackDevServer(compiler, {
            publicPath: webpackH5Config.output.publicPath,
            host: '0.0.0.0',
            port,
            historyApiFallback: {
                rewrites: [{
                    from: /.*/g,
                    to: '/web/'
                }]
            },
            disableHostCheck: true,
            // noInfo: true,
            hot: true,
            stats: 'errors-only',
            overlay: true,
            watchOptions: {
                poll: 500
            }
        });
        app.listen(port);
    }
};