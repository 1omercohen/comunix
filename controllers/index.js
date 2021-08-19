const mongoose = require("mongoose");
const User = mongoose.model("User");
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require("../config");

const authValidation = socket => {
    if(!socket.context.userToken){
        throw Error("Not Authorized")
    }
    const user = jwt.verify(socket.context.userToken, config.secret)
    if(!user) {
        throw Error("Not Authorized");
    }
    return user;
}

const getMessage = async() => {
    const rand = axios.get('https://random-data-api.com/api/lorem_ipsum/random_lorem_ipsum');
    return rand.data.long_sentence;
}

const getRandomUser = async (io) => {
    const usersIds = await io.allSockets();
    const userArr = Array.from(usersIds);
    return userArr[Math.floor(Math.random() * userArr.length)];
}

module.exports = (io, socket) => {
    //socket.on(validation)
    socket.on("login", async (data, callback) => {
        const {password, email} = data;
        const user = await User.findOne({email}).lean()
        if(!user)
            throw Error("User not found");
        const salt = bcrypt.genSaltSync(12);
        const hashPassword = bcrypt.hashSync(password, salt);
        const passwordValidation = bcrypt.compareSync(user.password, hashPassword);
        if(!passwordValidation)
            throw Error("email or password are not valid");
        delete user.password;
        user.socketId = user
        socket.context.userToken = jwt.sign(user, config.secret)
        callback({status: true});

    })
    socket.on("register", async (data, callback) => {
        const {password, email} = data;
        const user = await User.findOne({email}).lean();
        if(user)
            throw Error("User already exists");
        const salt = bcrypt.genSaltSync(12);
        data.password = bcrypt.hashSync(password, salt);
        const newUser = await User.create(data);
        delete newUser.password;
        socket.context.userToken = jwt.sign(newUser.toObject(), config.secret)
        callback({status: true});
    })

    socket.on("me", callback => {
        const user = authValidation(socket);
        if(!!user) {
            delete user.socketId;
            callback(user);
        }
    })

    socket.on("spin", async () => {
        const user = authValidation(socket);
        if(!!user){
            const randomUser = getRandomUser(io);
            io.to(randomUser).emit("message", getMessage());
        }
    })
    socket.on("wild", ({numOfUsers}) => {
        const user = authValidation(socket);
        if(!!user){
            for(let i of numOfUsers){
                const randomUser = getRandomUser(io);
                io.to(randomUser).emit("message", getMessage());
            }
        }
    })
    socket.on("blast", () => {
        const user = authValidation(socket);
        if(!!user){
            io.emit("blast", getMessage());
        }
    })

    socket.on("disconnect", () => {
        delete socket.context;
    })
}