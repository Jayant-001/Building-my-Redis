/**
 * Handles Redis-like commands execution
 */
class CommandHandler {
    constructor(database, serializer) {
        this.database = database;
        this.serializer = serializer;
    }

    /**
     * Executes a Redis command
     * @param {Array} command - Array containing command and its arguments
     * @returns {string|null} Serialized response
     */
    execute(command) {
        if (!Array.isArray(command) || command.length === 0) {
            return this.serializer.returnError('Invalid command format');
        }

        const [cmd, ...args] = command;
        const handler = this.getCommandHandler(cmd.toLowerCase());
        
        if (!handler) {
            return this.serializer.returnError('Unknown command');
        }

        try {
            return handler.apply(this, args);
        } catch (error) {
            return this.serializer.returnError(error.message);
        }
    }

    getCommandHandler(cmd) {
        const handlers = {
            'set': (key, value) => {
                if (!key) throw new Error('Key is required');
                this.database.set(key, value);
                return this.serializer.returnOk();
            },
            'get': (key) => {
                if (!key) throw new Error('Key is required');
                return this.serializer.returnBulkString(this.database.get(key));
            },
            'delete': (key) => {
                if (!key) throw new Error('Key is required');
                this.database.delete(key);
                return this.serializer.returnOk();
            },
            'exists': (key) => {
                if (!key) throw new Error('Key is required');
                return this.serializer.returnBoolean(this.database.exists(key));
            },
            'ping': () => this.serializer.returnPong(),
            'flushall': () => {
                this.database.clear();
                return this.serializer.returnOk();
            },
            'expire': (key, seconds) => {
                if (!key) throw new Error('Key is required');
                if (isNaN(seconds)) throw new Error('Expire time must be a number');
                this.database.setKeyExpire(key, parseInt(seconds));
                return this.serializer.returnOk();
            }
        };
        return handlers[cmd];
    }
}

module.exports = CommandHandler;
