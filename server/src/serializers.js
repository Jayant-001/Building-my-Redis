class Serializer {
    returnOk() {
        return "+Ok\r\n";
    }

    returnBulkString(result) {
        if (!result) return `$-1\r\n`;
        return `$${result.length}\r\n${result}\r\n`;
    }

    returnBoolean(value) {
        return value ? "#t\r\n" : "#f\r\n";
    }

    returnPong() {
        return "+PONG\r\n";
    }
}

module.exports = Serializer;
