import http from 'node:http';
import { writeFile, mkdirSync, existsSync } from 'node:fs';
import os from 'node:os';
import { Logger } from './Logger.js';

const logger = new Logger();

const hostname = "127.0.0.1";
const port = 3000;

logger.on('print computer\'s infos', () => {
    console.log('Complete task!');
});

var information = {
    OSType: os.type(),
    Platform: os.platform(),
    Release: os.release(),
    TotalMemory: os.totalmem(),
    FreeMemory: os.freemem(),
    RAM: os.totalmem(),
    USEDRAM: os.totalmem() - os.freemem(),
    CPU: os.cpus()
};

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');    
    res.end(JSON.stringify(information, null, 2));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// Ensure directory exists
const dirPath = 'E:\\NodeHomework';

if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
}

// Write to the file
writeFile(`${dirPath}\\homework.txt`, JSON.stringify(information, null, 2), (err) => {
    if (err) {
        console.log(err);
        return;
    }
    logger.emit('print computer\'s infos');
});
