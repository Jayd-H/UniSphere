"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./Routes/authRoutes"));
const societyRoutes_1 = __importDefault(require("./Routes/societyRoutes"));
const data_source_1 = require("./Data/data-source");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// The main function to start the server only after database initialization
async function startServer() {
    try {
        await data_source_1.Database.initialize();
        console.log("The database has been initialized!");
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        app.use('/api/auth', authRoutes_1.default);
        app.use('/api/societies', societyRoutes_1.default);
        app.get("/", (req, res) => {
            res.send("Express server is up and running!");
        });
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch (err) {
        console.error("Error during database initialization.", err);
    }
}
startServer();
exports.default = app;
