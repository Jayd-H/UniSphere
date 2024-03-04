import * as bcrypt from 'bcrypt';
import net from 'net';
import express from 'express';
const https = require('https');
import { createPool, Pool as ConnectionPool } from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';

 // Import for connection pool
const app = express();
const port = 3000;
const connStr = "mysql://root:Stanleypug2004@localhost:3306/world";
const pool = createPool(connStr);

// Main function to start the server
async function main(args: string[]): Promise<void> {
  try {
    console.log("UniSphere Backend");

    // Create connection pool
    const pool: ConnectionPool = createPool(connStr);

    // Server functionality
    const server = net.createServer();

    server.on('connection', async (socket: net.Socket) => {
      try {
        console.log('Client connected');

        // Receive request string (reading until empty chunk signifies end)
        let request = '';
        while (true) {
          const data = await socket.read();
          if (!data) {
            break; // Client disconnected
          }
          request += data.toString();
        }
        
        await doRequest(request, socket);

      } catch (error) {
        console.error('Client connection error:', error);
      } finally {
        socket.end(); // Ensure socket is closed
      }
    });

    server.listen(80, () => {
      console.log('Server listening on port 80');
    });

  } catch (error) {
    console.error(error);
  }
}

// Function to handle incoming requests
async function doRequest(request: string, socket: net.Socket): Promise<void> {
  try {
    const lines = request.split("\n");
    const firstLine = lines[0];

    if (!firstLine) {
      console.error("Incomplete request received"); 
      return;
    }

    const [method, path, httpVersion] = firstLine.split(" ");

    if (httpVersion !== "HTTP/1.1") {
      console.error(`Unsupported HTTP version: ${httpVersion}`);
      return;
    }

    switch (method) {
      case "GET":
        await ProcessCommand(); // Pass socket to Retrieve for response
        break;
      // Other methods (placeholders for now)
      case "POST":
        await ProcessCommand();
        break;
      case "DELETE":
        await ProcessCommand();
        break;
      case "PUT":
        await ProcessCommand();
        break;
      default:
        console.error(`Unsupported HTTP method: ${method}`);
    }
  } catch (error) {
    console.error("Error handling request:", error);
  }
}

app.use(express.json());

interface UserPasswordRow extends RowDataPacket {
  hash: string;
}

app.post('/login', async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;
  try {
    const sql = `SELECT hash FROM passwords WHERE username = ?`;
    const [rows] = await pool.query<RowDataPacket[]>(sql, [username]);
    const userRows = rows as UserPasswordRow[];

    if (userRows.length > 0) {
      const storedHash = userRows[0].hash;
      const isMatch = await bcrypt.compare(password, storedHash);
      if (isMatch) {
        res.json({ success: true, message: "Login successful" });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error verifying password:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

//mostly for command line testing 
//function that takes an incoming request, processes it, send out a reply
async function ProcessCommand() {

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

// Function to retrieve data from the database
async function Retrieve(): Promise<any | null> {
    try {
      // Create a connection from the pool
      const pool: ConnectionPool = createPool(connStr);
      const conn = await pool.getConnection();
  
      try {
        // Perform the database query
        const sql = `SELECT * FROM city`;
        const [rows, fields] = await conn.query(sql);
  
        if (Array.isArray(rows)) {
          if (rows.length > 0) {

            for (const row of rows) {
                console.log(row); // Output the entire row
          } 
          
        } else {
          console.error("Unexpected error retrieving data");
        }
      } 
  
    } 
    catch (error) {
        console.error(`Error retrieving data: ${error}`);
        return null;
      }
      finally {
        await conn.release();
      }
  }
 finally{console.log('finished')}
}

// Function to hash and store a password
async function hashAndStorePassword(plainTextPassword: string): Promise<void> {
  try {
    // Generate a salt (randomly generated string used for hashing)
    const saltRounds = 10; // Adjust the cost factor as needed
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the salt
    const hash = await bcrypt.hash(plainTextPassword, salt);

    // Connect to the database
    const pool: ConnectionPool = createPool(connStr);
    const conn = await pool.getConnection();

    try {
      // Prepare the SQL statement with placeholders
      const sql = `INSERT INTO passwords (hash) VALUES (?)`;
      const [insertResult] = await conn.query(sql, [hash]);

      if (!insertResult) {
        console.log("Password hashed and stored successfully");
      } else {
        console.error("Error storing hashed password in database:", insertResult);
      }

    } catch (error) {
      console.error("Error connecting to database:", error);
    } finally {
      await conn.release();
    }

  } catch (error) {
    console.error("Error hashing password:", error);
  }
}

// Function to compare a plain text password with a stored hash
async function comparePassword(
  connPool: ConnectionPool,
  username: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    const sql = `SELECT hash FROM passwords WHERE username = ?`;
    const [rows] = await connPool.query(sql, [username]);
    
    if (Array.isArray(rows) && rows.length > 0 && 'hash' in rows[0]) {
      const storedHash = rows[0].hash;
      const isMatch = await bcrypt.compare(hashedPassword, storedHash);
      return isMatch;
    } else {
      console.error("User not found or no hash stored for user.");
      return false;
    }
  } catch (error) {
    console.error("Error verifying password:", error);
    return false;
  }
}


main([]);
