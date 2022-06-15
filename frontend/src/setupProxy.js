const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'www.http://localhost:3060',
            changeOrigin: true,
        })
    );
};

// https://boogschutter-api.herokuapp.com
// www.http://localhost:3060