# My Redis Implementation

A lightweight Redis-like implementation with both server and client components, built with Node.js. This project includes a Redis-compatible server and an interactive CLI client.

## Project Structure

```
my-redis/
├── server/           # Redis server implementation
├── client/           # Redis CLI client
├── package.json
└── README.md
```

## Quick Start

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/my-redis.git
cd my-redis
```

2. Install dependencies:

```bash
npm install
```

### Running the Server

```bash
cd server
node index.js
```

The Redis-compatible server will start on port 4000.

### Running the Client

```bash
cd client
node index.js
```

The interactive CLI will start and automatically connect to the server.

## Components

### 1. Redis Server (server/)

A Redis-compatible server implementation that supports:

-   Basic Redis commands (SET, GET, DELETE, etc.)
-   Key expiration (TTL)
-   Data persistence through snapshots
-   RESP (Redis Serialization Protocol)
-   In-memory data storage

[Detailed Server Documentation](./server/README.md)

### 2. Redis CLI (client/)

An interactive command-line interface that:

-   Connects to the Redis server
-   Supports all implemented Redis commands
-   Provides a user-friendly interface
-   Includes error handling and connection management

[Detailed Client Documentation](./client/README.md)

## Supported Commands

| Command  | Description             |
| -------- | ----------------------- |
| SET      | Set key-value pair      |
| GET      | Retrieve value by key   |
| DELETE   | Remove key-value pair   |
| EXISTS   | Check if key exists     |
| EXPIRE   | Set key expiration time |
| PING     | Test server connection  |
| FLUSHALL | Clear all data          |

## Example Usage

```bash
# Start the server in one terminal
cd server && node index.js

# Start the client in another terminal
cd client && node index.js

# In the client CLI:
redis-cli> SET user:1 "John Doe"
OK
redis-cli> GET user:1
"John Doe"
redis-cli> EXISTS user:1
1
redis-cli> EXPIRE user:1 60
OK
```

## Features

-   **Server Features:**

    -   In-memory data storage
    -   Key expiration management
    -   Data persistence
    -   RESP protocol support
    -   Connection management

-   **Client Features:**
    -   Interactive CLI
    -   Command history
    -   Error handling
    -   Pretty-printed responses
    -   Auto-reconnection

## Technical Details

-   **Server Port:** 4000 (default)
-   **Protocol:** RESP (Redis Serialization Protocol)
-   **Storage:** In-memory with JSON persistence
-   **Language:** Node.js

## Development

This project is designed to be extensible. You can:

-   Add new Redis commands
-   Implement additional data structures
-   Enhance persistence mechanisms
-   Add clustering support

For detailed implementation guides, check the respective README files in server/ and client/ directories.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Submit a pull request

## License

MIT

## More Information

-   [Server Documentation](./server/README.md)
-   [Client Documentation](./client/README.md)
-   [Redis Protocol Specification](https://redis.io/topics/protocol)
