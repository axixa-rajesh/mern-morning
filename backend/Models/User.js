import Model from "./Model.js";

export default class User extends Model{
    constructor() {
        super('Users');
    }
   async findEmail(email) {
               
                 
        const data = (await this.table.findOne({ email: email }))?.email; 
        return data;
    }
    
}