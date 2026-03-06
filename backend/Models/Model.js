import { db,mongoose } from "../config/db.js";

await db();
export default class Model{
    constructor(table, pk) {
        
        this.table = mongoose.connection.collection(table);
        this.key = pk ?? 'id';
    }
    async all(cols="*") {
        const data = await this.table.find().toArray(); 
        return data;
    }
    //  async query(qry) {
    //   const   data = (await db.query(qry))[0]; 
    //     return data;
    // }
     async find(id,cols="*") {
         const data = (await this.table.find({ [this.key]: id })); 
        return data;
    }
    async create(reqdata) {

        const   data = (await this.table.insertOne(reqdata)); 
        return data;
        
    }
    async update(id,reqdata) {

        // let sql = `update ${this.table} set `;
        // for (let key in reqdata) {
        //     sql += `${key}="${reqdata[key]}",`;
        // }
        // sql = sql.slice(0, -1) + ` where ${this.key}='${id}'`;
        // const   data = (await db.query(sql))[0]; 
        return {};
        
    }
    async delete(id){
     // const   data = (await db.query(`delete from ${this.table} where ${this.key}='${id}'`))[0]; 
        return {};
    }

}