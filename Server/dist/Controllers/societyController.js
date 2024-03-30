"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpecificSociety = exports.getUserSocieties = exports.getAllSocieties = void 0;
const UserSocieties_1 = require("../Data/UserSocieties");
const Societies_1 = require("../Data/Societies");
const data_source_1 = require("../Data/data-source");
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
const getUserSocieties = async (req, res) => {
    try {
        const userSocieties = await UserSocieties_1.UserSocieties.find({ where: { userId: req.user.id } });
        if (!userSocieties || userSocieties.length === 0) {
            return res.status(200).json({ success: true, data: [] });
        }
        const societyIds = userSocieties.map((us) => us.societyId);
        const societies = [];
        for (const societyId of societyIds) {
            const society = await Societies_1.Societies.findOne({ where: { id: societyId } });
            if (society) {
                societies.push(society);
            }
            else {
                console.warn(`Society with id ${societyId} not found`);
            }
        }
        res.status(200).json({ success: true, data: societies });
        return societies;
    }
    catch (error) {
        console.error("Error fetching user societies:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.getUserSocieties = getUserSocieties;
const getSpecificSociety = async (req, res) => {
    var _a, _b;
    try {
        // Extract societyId (adjust for GET request if needed)
        const societyId = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.societyId) || ((_b = req.query) === null || _b === void 0 ? void 0 : _b.societyId);
        // Find society
        const society = await data_source_1.Database.getRepository(Societies_1.Societies).findOne({ where: { id: societyId } });
        // Handle non-existent society
        if (!society) {
            return res.status(404).json({ success: false, message: "Society not found" });
        }
        // Return retrieved society
        res.status(200).json({ success: true, data: society });
    }
    catch (error) {
        console.error("Error fetching society:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.getSpecificSociety = getSpecificSociety;
