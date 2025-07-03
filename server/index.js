import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from "./routes.js"

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json())

app.get('/', (req,res) => {
    res.status(200).json({message:"Hello form chat-4"});
})

app.use("/api", routes);

app.listen(8080, () => console.log("Server has started on port 8080"))