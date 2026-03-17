import User from "../Models/User.js";
import { mongoose } from "../config/db.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../helper/hepler.js";
export default class AuthController {
    constructor() {
        this.user = new User();
        this.signIn = this.signIn.bind(this);
        this.register = this.register.bind(this);      
    }
    signIn(req, res) {
        res.status(200).json({   message: "done ",data:" I am testing login..."});       
    }
   async register(req,res) {
             let { name, email,password } = req.body; 
        if (!name ||  !email || !password) {
            res.status((400)).json({
                message: "All fields are required ",
                data: []
            });
        } else {
            let result;
            try {
                if (!(await this.user.findEmail(email))) {
                    console.log(email);
                    
                    password = await bcrypt.hash(password,10)
                    result = await this.user.create({ name, email, password });
                    const token = generateToken(result.insertedId);
                     res.status((200)).json({
                        message: "Registration Successfully",
                        data: result,
                        token
                    });
                    
                } else {
                    return res.status(400).json({msg:`${email} email user already exists`})
                }
            } catch (e) {
            res.status((500)).json({
                message: "Somthing went wrong",
                data: []
            }); 
            }
           
        }
    }
}