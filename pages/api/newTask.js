import { checkAuth, connectDB } from "@/utils/features";
import { Task } from "../../models/task";
import { errorHandler } from "@/middleware/error";

const handler = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return errorHandler(res, 400, "Only POST method is allowed");
    }

    const { title, description } = req.body;
    if (!title || !description) {
      errorHandler(res, 400, "Please Enter all the fields");
    }
    await connectDB();

    const user = await checkAuth(req);
    // console.log(user);

    if (!user) {
      return errorHandler(res, 401, "Login Again");
    }
    const createTask = await Task.create({
      title: title,
      description: description,
      user: user._id,
    });

    return res.json({
      success: true,
      message: "Task Created",
      data: createTask,
    });
  } catch (error) {
    errorHandler(res, 500, error.message);
  }
};

export default handler;
