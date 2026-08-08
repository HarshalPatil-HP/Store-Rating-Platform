import { ApiError } from "../utils/api-error.utils.js";
import { ApiResponse } from "../utils/api-resolve.utils.js";
import { asyncHandler } from "../utils/async-handler.utils.js";


const healthCheck=asyncHandler (async(req,res)=>{
    res 
    .status(200)
    .json(new ApiResponse(200,
        {
            message:"server is still running"
        }));
});

export{healthCheck};