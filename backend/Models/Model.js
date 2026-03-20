import { db,mongoose } from "../config/db.js";

await db();
export default class Model{
    constructor(table, pk) {
        
        this.table = mongoose.connection.collection(table);
        this.key = pk ?? '_id';
    }
    async all(cols="*") {
        const data = (await this.table.find().toArray()); 
        //console.log(data);
        
        return data;
    }
    //  async query(qry) {
    //   const   data = (await db.query(qry))[0]; 
    //     return data;
    // }
    async find(id, cols = "*") {
       
         
        const data = (await this.table.find({ [this.key]: new mongoose.Types.ObjectId(id) }).toArray()); 
      
        
        return data;
    }
      async findCustom(obj) {
       
         
        const data = (await this.table.find(obj).toArray()); 
        return data;
    }
    async create(reqdata) {

        const   data = (await this.table.insertOne(reqdata)); 
        return data;
        
    }
    async update(id,reqdata) {

        const data = (await this.table.updateOne({ [this.key]: new mongoose.Types.ObjectId(id) }, { $set: reqdata })); 
        return data;
        
    }
    async delete(id){
      const data = (await this.table.deleteOne({ [this.key]: new mongoose.Types.ObjectId(id) })); 
        return data;
    }

}