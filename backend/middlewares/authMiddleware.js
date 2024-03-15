import signupServices from "./signupMiddleware.js";
import loginServices from "./loginMiddleware.js";

const authMiddleware = { signupServices, loginServices };

export default authMiddleware;