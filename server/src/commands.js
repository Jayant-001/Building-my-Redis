class CommandHandler {
    constructor(database, serializer) {
        this.database = database;
        this.serializer = serializer;
    }
    execute(command) {
        const [cmd, key, value] = command;

        switch (cmd.toLowerCase()) {
            case "set":
                this.database.set(key, value);
                return this.serializer.returnOk();
            case "get":
                return this.serializer.returnBulkString(this.database.get(key));
            case "delete":
                this.database.delete(key);
                return this.serializer.returnOk();
            case "exists":
                return this.serializer.returnBoolean(this.database.exists(key));
            case "ping":
                return this.serializer.returnPong();
            case "flushall":
                this.database.clear();
                return null;
            case "expire":
                this.database.setKeyExpire(key, value);
            default:
                return null;
        }
    }
}

module.exports = CommandHandler;
