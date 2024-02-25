const mysql = require('mysql2/promise'); // Use promise-based API for cleaner code
const net = require('net');

// the login for connecting to the database

const dbConfig = {
    host: 'localhost',
    user: 'root',
    database: 'world',
    port: 3306,
    password: 'Stanleypug2004#'
};


async function main() {
    console.log('whois program');
    try {


        // Create a connection pool for efficiency
        const connection = mysql.createPool(dbConfig);

        // Test the connection before proceeding
        try {
            await connection.getConnection();
            console.log('Connected to database');
        } catch (error) {
            console.error('Database connection error:', error);
            process.exit(1); // Terminate if connection fails
        }

        // Check for commands or server mode
        if (process.argv.length === 2) {
            console.log('Starting server');
            await runServer();
        } else {
            for (const arg of process.argv.slice(2)) {
                await ProcessCommand(arg); // Function not shown, provide implementation
            }
        }
    } catch (error) {
        console.error('Unhandled error:', error);
        process.exit(1); // Terminate on unhandled errors
    }
}


// Server functionality (assuming you want to implement it)
async function runServer() {
    const server = net.createServer();

    server.on('connection', async (socket: net.socket) => {
        try {
            console.log('Client connected');
            // Add client request handling logic here (using `doRequest` or whatever you choose)
        } catch (error) {
            console.error('Client connection error:', error);
        } finally {
            socket.end();
        }
    });

    server.listen(43, () => {
        console.log('Server listening on port 43');
    });
}
async function ProcessCommand(arg: string) {

}

async function doRequest() {

}
//Function that adds data to the database
async function Add() {

}
//function that updates existing data in the database
async function Update() {

}
//Function that deletes data in the database
async function Delete() {

}
//function that gets data from the database
async function Retrieve() {

}

main();








