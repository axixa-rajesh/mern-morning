import { db } from "../config/db.js";
export default class Model{
    constructor(table,pk) {
        this.table = table;
        this.key = pk ?? 'id';
    }
    async all(cols="*") {
      const   data = (await db.query(`select ${cols} from ${this.table} `))[0]; 
        return data;
    }
     async query(qry) {
      const   data = (await db.query(qry))[0]; 
        return data;
    }
     async find(id,cols="*") {
      const   data = (await db.query(`select ${cols} from ${this.table} where ${this.key}='${id}'`))[0]; 
        return data;
    }
    async create(reqdata) {

        let sql = `insert into ${this.table}(${Object.keys(reqdata)}) values(${Object.values(reqdata).map(val=>`"${val}"`)})`;
        const   data = (await db.query(sql))[0]; 
        return data;
        
    }
    async update(id,reqdata) {

        let sql = `update ${this.table} set `;
        for (let key in reqdata) {
            sql += `${key}="${reqdata[key]}",`;
        }
        sql = sql.slice(0, -1) + ` where ${this.key}='${id}'`;
        const   data = (await db.query(sql))[0]; 
        return data;
        
    }
    async delete(id){
      const   data = (await db.query(`delete from ${this.table} where ${this.key}='${id}'`))[0]; 
        return data;
    }

}