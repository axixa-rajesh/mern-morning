import { db,mongoose } from "../config/db.js";
import Category from "../Models/Category.js";

await db();
export default class CategoryController{
     constructor() {
            this.category = new Category();
            this.index = this.index.bind(this);
            this.store = this.store.bind(this);
            this.update = this.update.bind(this);
            this.show = this.show.bind(this);
            this.destroy = this.destroy.bind(this);
          
            
        }
    async index(req, res) {
         let data;
        data = await  this.category.all(); 
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
                result = await this.category.create({name,description});
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
        data = (await this.category.find(id)); 
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
                result = await this.category.update(id,{name,description});
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
            result = await this.category.delete(id);
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