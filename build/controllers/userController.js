"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const generateToken_1 = require("../utils/generateToken");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { email, password, firstName, lastName } = req.body;
        const userExist = yield userModel_1.default.findOne({ email });
        if (userExist) {
            return res.send("User is already exist");
        }
        const saltRounds = 10;
        const hashPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const newUser = new userModel_1.default({
            firstName,
            lastName,
            email,
            password: hashPassword
        });
        const newUserCreated = yield newUser.save();
        if (!newUserCreated) {
            return res.send("user is not created");
        }
        const token = (0, generateToken_1.generateToken)(email);
        res.cookie("token", token);
        res.send("Signed up successfully!");
    }
    catch (error) {
        console.log(error, "Something wrong");
        res.status(500).send("Internal Server Error");
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            return res.send("User not found");
        }
        const matchPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!matchPassword) {
            return res.send("Password is not correct");
        }
        const token = (0, generateToken_1.generateToken)(email);
        res.cookie("token", token);
        res.send("Logged in!");
    }
    catch (error) {
        console.log(error, "Something wrong");
        res.status(500).send("Internal Server Error");
    }
});
exports.signin = signin;
