const fs = require("fs");
const path = require("path");

function createFileForDataSnapshot() {
    const dataDir = path.join(__dirname, "data");

    // Check if the directory exists; if not, create it
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    // Create a file in the 'data' directory (you can name the file as needed)
    const filePath = path.join(dataDir, "snapshot.json"); // You can change 'dataFile.txt' to whatever name you need

    // Ensure the file is created (if it doesn't exist)
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, ""); // Create an empty file
    }

    // Return the file path
    return filePath;
}

module.exports = { createFileForDataSnapshot };
