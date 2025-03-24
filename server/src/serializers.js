/**
 * Handles Redis protocol serialization
 */
class Serializer {
    returnOk() {
        return "+OK\r\n";
    }

    returnBulkString(result) {
        if (result === null || result === undefined) return "$-1\r\n";
        return `$${result.length}\r\n${result}\r\n`;
    }

    returnBoolean(value) {
        return value ? ":1\r\n" : ":0\r\n";
    }

    returnPong() {
        return "+PONG\r\n";
    }

    returnError(message) {
        return `-ERR ${message}\r\n`;
    }
}

module.exports = Serializer;
