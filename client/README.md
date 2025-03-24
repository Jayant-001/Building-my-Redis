# Redis Client Implementation

A command-line interface (CLI) client for interacting with our Redis server implementation.

## Features

-   Interactive command-line interface
-   Support for all basic Redis commands
-   Error handling and connection management
-   Pretty-printed responses
-   Command history

## Installation

```bash
npm install
```

Required dependencies:

-   ioredis
-   readline (built-in Node.js module)

## Usage

```bash
node index.js
```

## Important Code Sections

### 1. Connection Setup

```javascript
const redis = new Redis({
    port: 4000,
    host: "localhost",
    retryStrategy: (times) => Math.min(times * 50, 2000),
});
```

This section establishes the connection to the Redis server with retry logic.

### 2. Command Execution

```javascript
async function executeCommand(command) {
    const [cmd, ...args] = command.split(" ");
    const result = await redis[cmd.toLowerCase()](...args);
    // Process result...
}
```

Commands are parsed and executed using the ioredis client.

### 3. CLI Interface

```javascript
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "redis-cli> ",
});
```

Creates an interactive command-line interface using Node.js readline.

## Supported Commands

-   SET key value
-   GET key
-   DELETE key
-   EXISTS key
-   PING
-   FLUSHALL
-   EXPIRE key seconds

## Error Handling

The client includes robust error handling for:

-   Connection failures
-   Invalid commands
-   Server errors
-   Network issues

## Examples

```bash
redis-cli> SET name john
OK
redis-cli> GET name
"john"
redis-cli> EXISTS name
1
redis-cli> DELETE name
OK
```

## Development

### Adding New Commands

To add support for new commands:

1. Ensure the command is supported by the server
2. The command will automatically be available through ioredis

### Error Handling

All commands are wrapped in try-catch blocks and will:

-   Display meaningful error messages
-   Maintain connection stability
-   Prevent CLI crashes

## Troubleshooting

Common issues and solutions:

1. Connection refused
    - Ensure Redis server is running on port 4000
    - Check network connectivity
2. Command not found
    - Verify command spelling
    - Check if command is supported by server

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
