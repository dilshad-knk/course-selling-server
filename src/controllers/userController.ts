import bcrypt from "bcrypt";
import User, { UserType } from "../models/userModel";
import { generateToken } from "../utils/generateToken";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    
    const { email, password, firstName, lastName } = req.body as UserType;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.send("User is already exist");
    }
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User<UserType>({
        firstName,
        lastName,
        email,
        password: hashPassword
        
    })

    const newUserCreated = await newUser.save();

    if (!newUserCreated) {
      return res.send("user is not created");
    }

    const token = generateToken(email);
    res.cookie("token", token);
    res.send("Signed up successfully!");

  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).send("Internal Server Error");
  }
}



export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as UserType;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send("User not found");
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.send("Password is not correct");
    }

    const token = generateToken(email);
    res.cookie("token", token);
    res.send("Logged in!");
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).send("Internal Server Error");
  }
};

