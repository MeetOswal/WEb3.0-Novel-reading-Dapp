import Novel from "../databaseSchema/NovelCollection.mjs";
import express from "express";

const app = express.Router();

app.get("/s", async(req, res) => {

    try {
        const exist = await Novel.findOne({novelName : req.query.name})

    if(!exist){
        const response = {
            status : "free"
        }
        return res.status(200).send(response);
    }else{
        const response = {
            status : "exists"
        }
        return res.status(200).send(response)
    }
    } catch (error) {
        const response = {
            status : "faliure"
        }
        return res.status(400).send(response)
    }
});

export default app;