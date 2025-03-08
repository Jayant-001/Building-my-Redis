const net = require("net");
const Parser = require("redis-parser");
const CommandHandler = require("./src/commands");
const Serializer = require("./src/serializers");
const Database = require("./src/database");
const { createFileForDataSnapshot } = require("./src/utils");

// Creating all dependencies
const db = new Database();
const serializer = new Serializer();
const commandHandler = new CommandHandler(db, serializer);

// Load DB snapshot on startup
const snapShotFilePath = createFileForDataSnapshot();
db.loadSnapshot(snapShotFilePath);

// Save snapshot every 60 seconds
setInterval(() => {
    db.saveSnapshot(snapShotFilePath);
}, 60000);

setInterval(() => {
    db.removeExpiredItems();
    // console.log("Queue after removing expired items:", db.queue.heap);
    // console.log(db.queue.size());
}, 1000);

const server = net.createServer((connection) => {
    console.log("Client connected");

    connection.write("+Connected\r\n");

    connection.on("data", (data) => {
        const parser = new Parser({
            returnReply(reply) {
                console.log("=>", reply);

                const result = commandHandler.execute(reply);
                if (result) connection.write(result);
            },
            returnError(err) {
                console.log("err: ", err);
                connection.write("-ERR internal error\r\n");
            },
        });

        parser.execute(data);
    });

    // Handle the case when the connection is closed or reset
    connection.on("end", () => {
        console.log("Client disconnected");
    });

    connection.on("close", () => {
        console.log("Connection closed");
    });

    // Handle the error event to avoid crashing the server
    connection.on("error", (err) => {
        console.error("Error in connection:", err.message);
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log("My Redis server is running on PORT:", PORT);
});
