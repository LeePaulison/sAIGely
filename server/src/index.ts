// Entry point for your server
console.log('Server starting...');

// Example of ES module imports
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(`Server running from ${__dirname}`);

// Your server code goes here

