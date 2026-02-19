import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin:[process.env.FRONTEND_URL]
}))

const db = await mysql.createConnection({
    "host": process.env.DB_HOST,
    "user": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database":process.env.DB_NAME
});
// await db.connect();
app.get("/category", async(req, res) => {
    let data;
   
 data = (await db.query("select * from category "))[0]; 
   
   res.status((data.length?200:404)).json({
    message: (data.length?"Data successfully sent":"Data not found in db"),
    data: data
  });
})

app.post("/category", async (req, res) => { 
    let { name, description } = req.body; 
    if (!name ||  !description) {
        res.status((400)).json({
            message: "Both Category Name and Category Descritpion are required field",
            data: []
        });
    } else {
        let result;
        try {
            result = await db.query(`insert into category(name,description) values(?,?)`, [name, description]);
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
})
app.get("/axixa", (req, res) => {
    return res.send("Welcome in Axixa world");
})
app.get("/category/:id", async(req, res) => {
       let data;
    let id = req.params.id;
    data = (await db.query("select * from category where id="+id))[0]; 
   res.status((data.length?200:404)).json({
    message: (data.length?"Data successfully sent":"Data not found in db"),
    data: data[0]
  });
})
app.put("/category/:id", async(req, res) => {
    let { name, description } = req.body; 
     let id = req.params.id;
    if (!name || !description) {
        res.status((400)).json({
            message: "Both Category Name and Category Descritpion are required field",
            data: []
        });
    } else {
        let result;
        try {
            result = await db.query(`update category set name=?,description=? where id=?`, [name, description, id]);
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
})
app.delete("/category/:id", async(req, res) => {
        let id = req.params.id;
        let result;
        try {
            result = await db.query(`delete from category where id=?`, [id]);
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
    
})
app.listen("8000", () => {
    console.log(process.env.APP_NAME);
    
    console.log("Web backend is running on http://127.0.0.1:8000");
    
})
/* 

get
post
put/patch
delete
--------------
7 routes
method        fun-name   route                     action/work 
----------------------------------------------------------------------
get           index      /categories                all data fetch
get           show       /categories/{id}           single record fetch
post          store      /categories/               save record in db
put/patch(p)  update     /categories/{id}           update record in db
delete(p)     destroy    /categories/{id}           delete record in db


*/
/* 
model 
controller
-----------
controller 
module
service

*/