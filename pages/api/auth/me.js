import { errorHandler } from "@/middleware/error";
import { User } from "@/models/user";
import { checkAuth,} from "@/utils/features";


const handler = async (req, res) => {
  try {
    if (req.method !== "GET") {
      return errorHandler(res, 400, "Only GET method is allowed");
    }
    const user = await checkAuth(req)

    if(!user){
        return errorHandler(res,401,"Login Again")
    }
    
    res.status(201).json({
        success: true,
        message: "user fetched successfully",
       data:user
      });

  } catch (error) {
    errorHandler(res, 500, error.message);
  }
};

export default handler;
