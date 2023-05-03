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

    const { name, email, password } = req.body;

    console.log(req.body);
    
    if (!name || !email || !password) {
      errorHandler(res, 400, "Please Enter all the fields");
    }


    let user = await User.findOne({ email });
    if (user) {
      errorHandler(res, 400, "user with this email already exists");
    }

    const hashPassword = await bcrypt.hash(password,10)

    user = await User.create({ name, email, password:hashPassword });
    console.log(user);

    const token = generateToken(user._id);
    // console.log(token);

    cookieSetter(res, token, true);

    res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      user: user,
    });
  } catch (error) {
    errorHandler(res, 500, error.message);
  }
};

export default handler;
