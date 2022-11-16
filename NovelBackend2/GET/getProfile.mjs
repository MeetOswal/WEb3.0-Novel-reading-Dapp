import User from "../databaseSchema/UserCollection.mjs";
import NOVEL from "../databaseSchema/NovelCollection.mjs";
import express from "express";
import cookieParser from "cookie-parser";

const app = express.Router();

app.use(cookieParser());

app.get("/s", async(req, res) => {

    try {
        let user, novel, novelnext, novelprevious;
    if(req.query.name){

        user = await User.findOne({username : req.query.name}).select({username : 1, walletAddress : 1, userImage : 1});
    }
    else if(req.query.id){
        user = await User.findOne({_id : req.query.id}).select({username : 1, walletAddress : 1, userImage : 1});
    }else{
        return res.status(200).send({stats: "failure"});
    }

    if(req.query.page > 1){
        novel = await NOVEL.find({novelCreator : user.username}).skip(10*(req.query.page)).limit(10).select({novelName : 1, chapterCount : 1, lastUpdate : 1});
        novelnext = `http://localhost:3000/profile/s?page=${parseInt(req.query.page) + 1}&id=${user._id}`;
        novelprevious = `http://localhost:3000/profile/s?page=${parseInt(req.query.page) - 1}&id=${user._id}`;
        if(novel.length < 10){
            novelnext = "null";
        }
    }else{
        novel = await NOVEL.find({novelCreator : user.username}).limit(10).select({novelName : 1, chapterCount : 1, lastUpdate : 1});
        novelnext = `http://localhost:3000/profile/s?page=${parseInt(req.query.page) + 1}&id=${user._id}`;
        novelprevious = "null";
        if(novel.length < 10){
            novelnext = "null";
        }
    }

    const response = {
        status : "success",
        userData : user,
        novelData : novel,
        nextData : novelnext,
        previousData : novelprevious
    }

    return res.status(200).send(response)
    } catch (error) {
        const response = {
            status : "failure",
            data : error.message
        }

        return res.status(400).send(response);
    }
})

export default app;