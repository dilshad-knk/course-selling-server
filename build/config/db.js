"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDb = () => {
    try {
        mongoose_1.default.connect(process.env.DB || "");
        console.log("Mongodb connected");
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = connectDb;
