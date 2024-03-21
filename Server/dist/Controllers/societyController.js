"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSocieties = void 0;
const Societies_1 = require("../Data/Societies");
const getAllSocieties = async (req, res) => {
    try {
        const societies = await Societies_1.Societies.find();
        res.status(200).json({ success: true, data: societies });
    }
    catch (error) {
        console.error("Error fetching societies:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.getAllSocieties = getAllSocieties;
