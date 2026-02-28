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
    async show(req, res) {
        let data;
        let id = req.params.id;
        data = (await db.query("select * from category where id="+id))[0]; 
        res.status((data.length?200:404)).json({
        message: (data.length?"Data successfully sent":"Data not found in db"),
        data: data[0]
    });
    }
    async update(req, res) {
        let { name, description } = req.body; 
        let id = req.params.id;
        if (!name || !description) {
            res.status((400)).json({
                message: "Both Category Name and Category Descritpion are required field",
                data: []
            });
        } else {
            let result;
            try {
                result = await db.query(`update category set name=?,description=? where id=?`, [name, description, id]);
            } catch (e) {
                res.status((500)).json({
                    message: "Data not update, somthing went wrong",
                    data: []
                });
            }
            res.status((200)).json({
                message: "Data updated Successfully",
                data: result
            });
        }
    }
    async destroy(req, res) {
         let id = req.params.id;
        let result;
        try {
            result = await db.query(`delete from category where id=?`, [id]);
        } catch (e) {
            res.status((500)).json({
                message: "Data not delete, somthing went wrong",
                data: []
            });
        }
        res.status((200)).json({
            message: "Data deleted Successfully",
            data: result
        });
    }
}