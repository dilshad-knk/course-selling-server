"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const instructorSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["instructor", "admin"],
    },
    courses: [{ type: mongoose_1.default.Types.ObjectId, ref: "Course" }],
}, { timestamps: true });
const Instructor = mongoose_1.default.model("Instructor", instructorSchema);
exports.default = Instructor;
