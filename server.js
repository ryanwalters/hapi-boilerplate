'use strict';

var Config = require('./lib/config');
var Hapi = require('hapi');
var Jade = require('jade');
var Path = require('path');
var Routes = require('./lib/routes');

var plugins = [];
var server = new Hapi.Server();

server.connection({
    port: Config.port
});

server.views({
    engines: {
        jade: Jade
    },
    path: Path.join(__dirname, 'templates'),
    isCached: Config.env === 'production'
});

server.route(Routes);

/*plugins.push({
    register: require('good'),
    options: {
        reporters: [{
            reporter: require('good-console'),
            args: [{ log: '*', response: '*', ops: '*' }]
        }]
    }
});*/

server.register(plugins, function (err) {
    if (err) {
        throw err;
    }

    server.start(function () {
        console.log('Server running at: ', server.info.uri);
    });
});