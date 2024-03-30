"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSocieties = exports.getAllSocieties = void 0;
const UserSocieties_1 = require("../Data/UserSocieties");
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
