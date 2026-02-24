import Model from "./Model.js";

export default class Product extends Model{
    constructor() {
        super('products','product_id');
    }
}