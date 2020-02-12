const routes = module.exports = require('next-routes')()

routes.add('/campaigns/new','campaigns/new');
routes.add('/campaigns/:address/requests','campaigns/request/index');
routes.add('/campaigns/:address/requests/new','campaigns/request/newRequest');
routes.add('/campaigns/:address','campaigns/show');

module.exports = routes;
