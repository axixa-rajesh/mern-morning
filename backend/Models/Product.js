import Model from "./Model.js";

export default class Product extends Model{
    constructor() {
        
        super('products','_id');
    }
    async fetchWithCats() {
        
         const data = (await this.table.aggregate([
  {
    $lookup: {
      from: "category",
      localField: "category_id",
      foreignField: "_id",
      as: "category"
    }
  },
  { $unwind: "$category" },
  {
    $project: {
      name: 1,
      price: 1,
          _id: 1,
      category_id:1,
      category_name: "$category.name"
    }
  }
         ]).toArray()); 
        console.log(data);
        
        return data;
    }
}