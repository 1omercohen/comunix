const Client = require("socket.io-client");

describe("my awesome project", () => {
    let io, clientSocket;

    beforeAll((done) => {
        clientSocket = new Client(`http://localhost:3000`);
    });

    afterAll(() => {
        io.close();
        clientSocket.close();
    });

    test("register test", (done) => {
        clientSocket.emit("register", {firstname: "mor", lastname: "mizachi", email: "mor@mizachi.com", password: "Mm1234"}, cb => {
            expect(cb.status).toBe(true);
            done();
        })
    });

    test("register test", (done) => {
        clientSocket.emit("register", {firstname: "toni", lastname: "toval", email: "toni@toval.com", password: "Tt1234"}, cb => {
            expect(cb.status).toBe(true);
            done();
        })
    });

    test("register test", (done) => {
        clientSocket.emit("register", {firstname: "joni", lastname: "levi", email: "joni@levi.com", password: "Jl1234"}, cb => {
            expect(cb.status).toBe(true);
            done();
        })
    });

    test("register test", (done) => {
        clientSocket.emit("register", {firstname: "sharon", lastname: "sitbon", email: "sharon@sitbon.com", password: "Ss1234"}, cb => {
            expect(cb.status).toBe(true);
            done();
        })
    });

    test("register test", (done) => {
        clientSocket.emit("register", {firstname: "lola", lastname: "ela", email: "lola@ela.com", password: "Le1234"}, cb => {
            expect(cb.status).toBe(true);
            done();
        })
    });

    //Only if you mack one of your register in commend after first time
    // test("login test", (done) => {
    //     clientSocket.emit("login", {firstname: "joni", lastname: "levi", email: "joni@levi.com", password: "Jl1234"}, cb => {
    //         expect(cb.status).toBe(true);
    //         done();
    //     })
    // });

    test("spin test", (done) => {
        clientSocket.emit("spin")
        clientSocket.on('message', (data) => {
            expect(data).toBeInstanceOf(String);
            done();
        })
    });

    test("wild test", (done) => {
        clientSocket.emit("wild", 3)
        clientSocket.on('message', (data) => {
            expect(data).toBeInstanceOf(String);
            done();
        })
    });

    test("blast test", (done) => {
        clientSocket.emit("blast")
        clientSocket.on('message', (data) => {
            expect(data).toBeInstanceOf(String);
            done();
        })
    });
});