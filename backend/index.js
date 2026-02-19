import app from "./app.js";
app.listen("8000", () => {
    console.log(process.env.APP_NAME);
    
    console.log("Web backend is running on http://127.0.0.1:8000");
    
})