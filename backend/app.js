import express from 'express';
import cors from "cors";
import CategoryController from './controller/CategoryController.js';
const cats = new CategoryController();

const app = express();
app.use(express.json());
app.use(cors({
    origin:[process.env.FRONTEND_URL]
}))


// await db.connect();
app.get("/category", cats.index);

app.post("/category", cats.store);
/*
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
    
}) */
export default app;

