import { checkAuth, connectDB } from "@/utils/features";
import { Task } from "../../models/task";
import { errorHandler } from "@/middleware/error";

const handler = async (req, res) => {
  try {
    if (req.method !== "GET") {
      return errorHandler(res, 400, "Only GET method is allowed");
    }

    await connectDB();
    console.log("req----->",req.headers);
    const user = await checkAuth(req);

    if(!user){
        return errorHandler(res,401,"Login Again")
    }

    console.log("USER after decoding----->",user);

    const tasks = await Task.find({ user: user._id });
// console.log(tasks);
    return res.json({
      success: true,
      message: "Task Fetched Successfully",
      task: tasks,
    });
  } catch (error) {
    errorHandler(res, 500, error.message);
  }
};

export default handler;
