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
    async create(data) {
        console.log(data);
    }
}