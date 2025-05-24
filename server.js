// server.js
import dotenv from 'dotenv';
dotenv.config(); // If using .env.local

import './lib/wsServer.js'; // ✅ This pulls in your WebSocket logic
