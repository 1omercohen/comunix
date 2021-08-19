const { Server } = require("socket.io");
const mongoose = require("mongoose");
const { createAdapter } = require("@socket.io/redis-adapter");
const { Cluster } = require("ioredis");
const controller = require('./controllers');

mongoose.connect("mongodb//localhost:27017/comunix")
require("./models/User");

const io = new Server();

const pubClient = new Cluster([
    {
        host: "localhost",
        port: 6380,
    },
    {
        host: "localhost",
        port: 6381,
    },
]);

const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));

//io.use()

io.use((socket, next) => {
    socket.context = {};
})

io.on("connection", (socket) => {
    controller(io, socket);
});


io.listen(3000);