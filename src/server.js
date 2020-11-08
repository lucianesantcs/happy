const express = require('express');
const path = require('path');
const pages = require('./pages.js');

// initialize express
const server = express();

// ultilizar body do request
server.use(express.urlencoded({ extended: true }));

// use static files
server.use(express.static('public'));

// configure template engine + change .html files to .hbs
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'hbs');

// create routes
server.get('/', pages.index);
server.get('/orphanage', pages.orphanage);
server.get('/orphanages', pages.orphanages);
server.get('/create-orphanage', pages.createOrphanage);
server.post('/save-orphanage', pages.saveOrphanage);

// initialize server
server.listen('3333');
