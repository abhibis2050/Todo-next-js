import { checkAuth, connectDB } from "@/utils/features";
import { errorHandler } from "@/middleware/error";
import { Task } from "@/models/task";

const handler = async (req, res) => {
  try {
    if (req.method === "PATCH") {
      await connectDB();
      console.log("req----->", req.headers);
      const user = await checkAuth(req);

      if (!user) {
        return errorHandler(res, 401, "Login Again");
      }

      console.log("USER after decoding----->", user);

      console.log(req.query);

      const taskId = req.query.id;

      const task = await Task.findById({ _id: taskId });
      if (!task) {
        return errorHandler(res, 404, "Task not found");
      }

      await Task.updateOne({ _id: taskId }, { isCompleted: !task.isCompleted });

      res
        .status(200)
        .json({ success: true, message: "Task Update successfully" });
    } else if (req.method === "DELETE") {
      await connectDB();
      console.log("req----->", req.headers);
      const user = await checkAuth(req);

      if (!user) {
        return errorHandler(res, 401, "Login Again");
      }

      console.log("USER after decoding----->", user);

      console.log(req.query);

      const taskId = req.query.id;

      const task = await Task.findById({ _id: taskId });
      if (!task) {
        return errorHandler(res, 404, "Task not found");
      }
      await Task.deleteOne({ _id: taskId });

      res
        .status(200)
        .json({ success: true, message: "Task Deleted successfully" });
    } else {
      return errorHandler(res, 400, "METHOD should be either PATCH or DELETE");
    }
  } catch (error) {
    errorHandler(res, 500, error.message);
  }
};

export default handler;
