import express from "express";
import path from "path";
import { viewRouter } from "./routes/views.routes.js";
const app = express();
app.use(express.static(path.join(process.cwd(),"public")))
app.set("view engine", "ejs");
app.set("views",path.join(process.cwd(),"src","views"))

app.use(viewRouter);

let PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running ${PORT}-port`);
})