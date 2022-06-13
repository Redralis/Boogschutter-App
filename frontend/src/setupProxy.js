const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://boogschutter-api.herokuapp.com',
            changeOrigin: true,
        })
    );
};

// https://boogschutter-api.herokuapp.com
// www.http://localhost:3060