import { errorHandler } from "@/middleware/error";
import { User } from "@/models/user";
import { connectDB, cookieSetter, generateToken } from "@/utils/features";
import bcrypt from "bcrypt"

const handler = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return errorHandler(res, 400, "Only POST method is allowed");
    }
    await connectDB();
    const { email, password } = req.body;

    console.log(req.body);

    if ( !email || !password) {
      errorHandler(res, 400, "Please Enter all the fields");
    }

    const user = await User.findOne({ email });
    if (!user) {
      errorHandler(res, 400, "user not found,Register Now !!!");
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch) {
        return errorHandler(res,400,"password didnot match")
    }
    const token = generateToken(user._id);
   
    cookieSetter(res, token, true);

    res.status(201).json({
        success: true,
        message: "Logged In Successfully",
        user: user,
      });

  } catch (error) {
    errorHandler(res, 500, error.message);
  }
};

export default handler;
