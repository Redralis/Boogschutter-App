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
            target: 'https://alliance-damitie-backend.herokuapp.com/',
            changeOrigin: true,
        }),
    );
};

// https://alliance-damitie-backend.herokuapp.com/
// www.http://localhost:3060