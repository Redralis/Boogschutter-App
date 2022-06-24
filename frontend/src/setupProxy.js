const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    // app.use(
    //     '/api',
    //     createProxyMiddleware({
    //         target: 'http://boogschutter-api.herokuapp.com',
    //         changeOrigin: true,
    //     }),
    // );

    app.use(
        '/local',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        }),
    );
};

// http://localhost:5000
// www.http://localhost:3060