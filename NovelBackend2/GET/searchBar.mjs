import User from "../databaseSchema/UserCollection.mjs";
import NOVEL from "../databaseSchema/NovelCollection.mjs";
import express from "express";

const app = express.Router();

app.get("/s", async(req, res) => {
    try {
        
        let resultCreator, resultNovel;
        if(req.query.name){
            resultNovel = await NOVEL.find({novelName : { $regex: req.query.name, $options: "i" }}).limit(10).select({username : 1, userImage : 1});
            resultCreator = await User.find({username : { $regex: req.query.name, $options: "i" }}).limit(10).select({novelName : 1, novelThumbnail : 1});

            const response = {
                status : "Success",
                novel : resultNovel,
                artist : resultCreator
            }

            return res.status(200).send(response);
        }else{
            return res.status(200).send([])
        }
    } catch (error) {
        const response = {
            status : "Failure",
            data : error.message
        }

        return res.status(400).send(response);
    }
});

export default app;