const Redis = require("ioredis");
const readline = require("readline");

// Configuration
const CONFIG = {
    port: 4000,
    host: 'localhost',
    retryStrategy: (times) => Math.min(times * 50, 2000)
};

/**
 * Create Redis client with error handling
 */
const redis = new Redis(CONFIG);

redis.on('error', (err) => {
    console.error('Redis connection error:', err.message);
});

redis.on('connect', () => {
    console.log('Connected to Redis server');
});

// Setup CLI interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "redis-cli> ",
});

/**
 * Execute Redis commands with error handling
 * @param {string} command - Raw command string
 */
async function executeCommand(command) {
    try {
        const [cmd, ...args] = command.split(' ');
        
        if (!cmd) return;

        // Validate command
        if (!redis[cmd.toLowerCase()]) {
            throw new Error(`Unknown command: ${cmd}`);
        }

        const result = await redis[cmd.toLowerCase()](...args);
        
        // Format output based on result type
        if (result === null) {
            console.log('(nil)');
        } else if (Array.isArray(result)) {
            result.forEach((item, i) => console.log(`${i + 1}) ${item}`));
        } else {
            console.log(result);
        }
    } catch (err) {
        console.error('Error:', err.message);
    }
}

// Handle CLI input
rl.on("line", async (line) => {
    const command = line.trim();
    
    if (command === 'quit' || command === 'exit') {
        console.log('Goodbye!');
        process.exit(0);
    }
    
    if (command) {
        await executeCommand(command);
    }
    
    rl.prompt();
}).on("close", () => {
    console.log("\nClosing connection...");
    redis.disconnect();
    process.exit(0);
});

// Start CLI
console.log('Welcome to Redis CLI');
rl.prompt();
