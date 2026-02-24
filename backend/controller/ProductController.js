import Product from "../Models/Product.js";

export default class ProductController{
    constructor() {
        this.product = new Product();
        this.index = this.index.bind(this);
      
        
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
        // this.product.create()
    }
}
