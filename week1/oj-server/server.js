var express = require('express');
var app = express();
var restRouter = require('./routers/rest');
var indexRouter = require('./routers/index');
var path = require('path');
var mongoose = require('mongoose');
var http = require('http');
var socket_io = require('socket.io');
var io = socket_io();
var socketService = require('./services/socketSetvice')(io);


mongoose.connect('mongodb://localhost:27017/node');

app.use(express.static(path.join(__dirname, '../public')));
app.use('/', indexRouter);
app.use('/api/v1', restRouter);

var server = http.createServer(app);
io.attach(server);
server.listen(3000);

server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    throw error;
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr == 'string'
    ? 'pipe '+ addr
        :'port' +addr.port;
    console.log('listening on '+ bind);
}