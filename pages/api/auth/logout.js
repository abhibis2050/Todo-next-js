import { errorHandler } from "@/middleware/error";
import { cookieSetter  } from "@/utils/features";


const handler = async (req, res) => {
  try {
    if (req.method !== "GET") {
      return errorHandler(res, 400, "Only GET method is allowed");
    }
   
    cookieSetter(res, null, false);

    res.status(201).json({
        success: true,
        message: "Logged Out Successfully",
  
      });

  } catch (error) {
    errorHandler(res, 500, error.message);
  }
};

export default handler;
