const Redis = require("ioredis");
const readline = require("readline");

// Create a Redis client
const redis = new Redis(4000);

// Setup readline for command line input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "jayant's redis-cli> ",
});

rl.prompt();

async function executeCommand(command) {

    const args = command.split(' ');
    const cmd = args.shift();

    console.log("Executing command ", cmd, args)
    try {
        const result = await redis[cmd](...args);
        console.log(result);
    } catch (err) {
        console.error('Error:', err.message);
    }
}

rl.on("line", async (line) => {
    const command = line.trim();
    if (command) {
        await executeCommand(command);
    }
    rl.prompt();
}).on("close", () => {
    console.log("Bye bye, See you again...");
    process.exit(0);
});
