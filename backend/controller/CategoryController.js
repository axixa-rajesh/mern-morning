import { db } from "../config/db.js";

export default class CategoryController{
    async index(req, res) {
         let data;
        data = (await db.query("select * from category "))[0]; 
        // data=[{id:1,name:"abc",description:"xyz"}]
        res.status((data.length?200:404)).json({
            message: (data.length?"Data successfully sent":"Data not found in db"),
            data: data
        });

    }
    async store (req, res)  { 
        let { name, description } = req.body; 
        if (!name ||  !description) {
            res.status((400)).json({
                message: "Both Category Name and Category Descritpion are required field",
                data: []
            });
        } else {
            let result;
            try {
                result = await db.query(`insert into category(name,description) values(?,?)`, [name, description]);
            } catch (e) {
            res.status((500)).json({
                message: "Data not saved somthing went wrong",
                data: []
            }); 
            }
            res.status((200)).json({
                message: "Data saved Successfully",
                data: result
            });
        }
    }
}