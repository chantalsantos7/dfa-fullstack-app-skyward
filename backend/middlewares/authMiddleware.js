import signupServices from "./signupMiddleware.js";
import loginServices from "./loginMiddleware.js";
import verificationMiddleware from "./verificationMiddleware.js";

const authMiddleware = { signupServices, loginServices, verificationMiddleware};

export default authMiddleware;