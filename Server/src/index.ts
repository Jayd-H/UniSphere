const mysql = require('mysql2/promise'); // Use promise-based API for cleaner code
import net from 'net';







import { createPool, Pool as ConnectionPool } from 'mysql2/promise'; // Import for connection pool

const connStr = "mysql://root:Stanleypug2004@localhost:3306/usersdb";

async function main(args: string[]): Promise<void> {
  try {
    console.log("UniSphere Backend");

    // Create a connection pool
    const pool: ConnectionPool = createPool(connStr);

    // Get a connection from the pool
    const conn = await pool.getConnection();

    console.log("Connecting to MySQL--- world database");

    // Release the connection back to the pool
    await conn.release();

    // Close the connection pool (recommended upon program termination)
    await pool.end();

    if (args.length === 0) {
      console.log("Starting Server");
      await runServer();
    } else {
      for (const arg of args) {
        await ProcessCommand(arg);
      }
    }
  } catch (error) {
    console.error(error);
  }
}


// Server functionality (assuming you want to implement it)
async function runServer() {
    const server = net.createServer();

    server.on('connection', async (socket: net.Socket) => {
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

main([]);








