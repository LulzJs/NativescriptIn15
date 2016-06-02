"use strict"
var Observable = require("data/observable").Observable;
var ObservableArray = require('data/observable-array').ObservableArray;


var observe = new Observable({
    list: new ObservableArray(),
    textMessage: ""
});

exports.loaded = function(args) {
    var page = args.object;
    page.bindingContext = observe;
};


var SocketIO = require('nativescript-socket.io');
var socket = SocketIO.connect('http://10.0.2.2:3000', {});
var avatar_url= `http://api.adorable.io/avatars/50/${new Date().getMilliseconds()}.png`;

exports.sendText = function() {
    socket.emit('chat message', {
      text: observe.textMessage,
      avatar_url: avatar_url,
      datetime: new Date()
    });
    observe.textMessage = "";
};

socket.on('chat message', function(msg){
  observe.list.push(msg);
});
