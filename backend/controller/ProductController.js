import Product from "../Models/Product.js";

export default class ProductController{
    constructor() {
        this.product = new Product();
        this.index = this.index.bind(this);
        this.store = this.store.bind(this);
        this.update = this.update.bind(this);
        this.show = this.show.bind(this);
        this.destroy = this.destroy.bind(this);
      
        
    }
    async index(req, res) {
        try {
            const data = await this.product.all();
            if (data.length) {
                res.status(200).json({
                    message: "done ",
                    data: data
                });
            }
            else {
                   res.status(404).json({
                    message: "Data not found ",
                    data: []
                });
            }

        } catch (e) {
            res.status(500).json({
                message: "Something went wrong",
                data: "db error"
            });
        }
    }
    async store(req, res) {
      
        let info = {
            name: req.body.name,
            price: req.body.price,
            category_id:req.body.category_id??1
        }
       
        
         
        if (!info.name ||  !info.price) {
            res.status((400)).json({
                message: "Both name Name and price are required field",
                data: []
            });
        } else {
            let result;
            try {
                result = await this.product.create(info);
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
    async update(req, res) { 
         let id = req.params.id;
          let info = {
            name: req.body.name,
            price: req.body.price,
            category_id:1
        }
          if (!info.name ||  !info.price) {
            res.status((400)).json({
                message: "Both name Name and price are required field",
                data: []
            });
        } else {
            let result;
            try {
                result = await this.product.update(id,info);
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
    async show(req, res) {
          let data;
        let id = req.params.id;
        data = (await this.product.find(id)); 
        res.status((data.length?200:404)).json({
        message: (data.length?"Data successfully sent":"Data not found in db"),
            data: data[0]
         });
     }
    async destroy(req, res) { 
             
        let id = req.params.id;
        let result;
            try {
                result = await this.product.delete(id);
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
