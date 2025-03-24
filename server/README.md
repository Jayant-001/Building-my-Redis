# Redis Server Implementation

A lightweight Redis server implementation in Node.js that supports basic Redis commands with data persistence and key expiration features.

## Architecture Overview

```
server/
├── src/
│   ├── commands.js      # Command handling logic
│   ├── database.js      # Core data storage and operations
│   ├── serializers.js   # RESP protocol implementation
│   ├── priority_queue.js # TTL implementation
│   ├── utils.js         # Helper utilities
│   └── data/           # Data persistence directory
└── index.js            # Server entry point
```

## Technical Stack

-   **Node.js** - Runtime environment
-   **net** module - TCP server implementation
-   **redis-parser** - RESP protocol parsing
-   **Priority Queue** - Custom implementation for key expiration

## How It Works

### 1. Server Initialization

```javascript
// Server startup sequence
const db = new Database();
const serializer = new Serializer();
const commandHandler = new CommandHandler(db, serializer);

// Load existing data
const snapShotFilePath = createFileForDataSnapshot();
db.loadSnapshot(snapShotFilePath);
```

### 2. Connection Handling

The server listens on port 4000 and handles client connections using Node's TCP server:

```javascript
const server = net.createServer((connection) => {
    connection.on("data", (data) => {
        const parser = new Parser({
            returnReply(reply) {
                const result = commandHandler.execute(reply);
                if (result) connection.write(result);
            },
        });
        parser.execute(data);
    });
});
```

### 3. Data Storage

Data is stored in memory using JavaScript's Map:

```javascript
class Database {
    constructor() {
        this.store = new Map();
        this.queue = new PriorityQueue();
    }
}
```

### 4. Command Processing Flow

1. Client sends command
2. Redis parser processes RESP protocol
3. Command handler executes operation
4. Response serialized and sent back

### 5. Key Features

#### Persistence

-   Automatic snapshots every 60 seconds
-   Snapshot format: JSON
-   Automatic recovery on startup

```javascript
setInterval(() => {
    db.saveSnapshot(snapShotFilePath);
}, 60000);
```

#### Key Expiration (TTL)

-   Priority queue implementation
-   Periodic cleanup of expired keys
-   Millisecond precision

```javascript
setInterval(() => {
    db.removeExpiredItems();
}, 1000);
```

## Supported Commands

| Command  | Format               | Description            |
| -------- | -------------------- | ---------------------- |
| SET      | `SET key value`      | Store key-value pair   |
| GET      | `GET key`            | Retrieve value by key  |
| DELETE   | `DELETE key`         | Remove key-value pair  |
| EXISTS   | `EXISTS key`         | Check if key exists    |
| EXPIRE   | `EXPIRE key seconds` | Set key expiration     |
| PING     | `PING`               | Test server connection |
| FLUSHALL | `FLUSHALL`           | Clear all data         |

## RESP Protocol Implementation

The server implements Redis Serialization Protocol (RESP):

```javascript
class Serializer {
    returnBulkString(result) {
        if (!result) return "$-1\r\n";
        return `$${result.length}\r\n${result}\r\n`;
    }
    // Other serialization methods...
}
```

## Examples

### Basic Operations

```bash
SET user:1 "John Doe"
+OK

GET user:1
$8
John Doe

EXISTS user:1
:1

DELETE user:1
+OK
```

### Key Expiration

```bash
SET temp:key "value"
EXPIRE temp:key 5
# Key will be automatically removed after 5 seconds
```

## Error Handling

-   Connection errors
-   Invalid commands
-   Protocol errors
-   Data validation

```javascript
if (!handler) {
    return this.serializer.returnError("Unknown command");
}
```

## Performance Considerations

1. In-Memory Storage

    - Fast access times
    - Limited by available RAM

2. Expiration Mechanism

    - Priority queue for efficient TTL handling
    - O(log n) complexity for operations

3. Persistence
    - Asynchronous snapshot creation
    - JSON serialization for human readability

## Project Structure Insights

### Command Handler

-   Command pattern implementation
-   Modular command registration
-   Error handling wrapper

### Database Operations

-   Map-based storage
-   Atomic operations
-   Expiration management

### Serialization

-   RESP protocol compliance
-   Error formatting
-   Bulk string handling

## Future Enhancements

1. Data Types

    - Lists
    - Sets
    - Hashes

2. Advanced Features

    - Transactions
    - Pub/Sub
    - Clustering

3. Monitoring
    - Memory usage
    - Command statistics
    - Connection tracking

## Testing

To test the server:

1. Start the server: `node index.js`
2. Connect using redis-cli or any Redis client
3. Run supported commands

## Contributing

1. Fork the repository
2. Create feature branch
3. Implement changes
4. Submit pull request

## License

MIT License
