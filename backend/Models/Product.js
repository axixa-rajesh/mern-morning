import Model from "./Model.js";

export default class Product extends Model{
    constructor() {
        
        super('products','id');
    }
    async fetchWithCats() {
        let sql = `select product_id,category_id, products.name as product_name, category.name as category_name,price from products left join category on category.id=category_id order by product_id desc`;
        return await this.query(sql);
    }
}