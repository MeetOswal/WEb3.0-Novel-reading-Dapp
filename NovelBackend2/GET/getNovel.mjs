import NOVEL from "../databaseSchema/NovelCollection.mjs";
import express from "express"

const app = express.Router();

app.get("/:novelid", async(req, res) => {
    
    try {
        const result = await NOVEL.findOne({_id : req.params.novelid});

        const response = {
            status : "Success",
            data : response
        }
        return res.status(200).send(response);
    } catch (error) {
        const response = {
            status : "Success",
            data : error.message
        }
        return res.status(200).send(response);
    }
})

export default app;