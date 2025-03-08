const net = require("net");

const server = net.createServer((connection) => {
    console.log("Client connected");

    connection.on("data", (data) => {
        const command = data.toString().trim();
        console.log("=>", command);

        // Example: Handle simple Redis commands
        if (command.endsWith("PING")) {
            connection.write("+PONG\r\n"); // Respond with PONG
        } else if (command.startsWith("SET")) {
            const [_, key, value] = command.split(" ");
            // Here you would normally store the key-value pair in your database
            connection.write("+OK\r\n"); // Respond with OK for successful SET
        } else if (command.startsWith("GET")) {
            const [_, key] = command.split(" ");
            // Here you would normally retrieve the value from your database
            connection.write("$-1\r\n"); // Respond with nil if not found
        } else {
            connection.write("-ERR unknown command\r\n"); // Handle unknown commands
        }
    });

    connection.on("end", () => {
        console.log("Client disconnected");
    });
});

server.listen(4000, () => {
    console.log("My Redis server is running on PORT: 4000");
});
