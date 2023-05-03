import mongoose from "mongoose";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import { errorHandler } from "@/middleware/error";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "NextTodo",
    })
    .then(console.log("connected to db"))
    .catch("connection Error");
};

export const cookieSetter = (res, token, set) => {
  const Savedtoken = token;

  res.setHeader(
    "Set-Cookie",
    serialize("token", set ? Savedtoken : "", {
      path: "/",
      httpOnly: true,
      maxAge: set ? 15 * 24 * 60 * 60 * 10000 : 0,
    })
  );
};

export const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET);
};

export const checkAuth = async (req, res) => {
  const cookie = req.headers.cookie;
  // console.log(cookie);

  if (!cookie) {
    console.log("cookie not found");
    return null
  }

  //   console.log(req.headers.cookie.split("="));
  const token = cookie.split("=")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // console.log("decoded----->", decoded);

  return await User.findById({ _id: decoded._id });
};
