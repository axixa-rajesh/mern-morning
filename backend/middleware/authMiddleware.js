import jwt from "jsonwebtoken";
const checklogin = (req, res, next) => {
    try {
        const token = req.headers.auth;
        console.log(token);
        
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
    } catch(e) {
           return res.status(401).json({message:"Unauthorized"})
    }
}
export default checklogin;