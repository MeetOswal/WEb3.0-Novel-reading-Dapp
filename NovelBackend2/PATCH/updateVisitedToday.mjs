import User from "../databaseSchema/UserCollection.mjs";
import NOVEL from "../databaseSchema/NovelCollection.mjs";
import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express.Router();

app.use(cookieParser());

app.patch("/:novelid", async(req, res) => {

    try {
        if(req.cookies.JWT){
            const verifyUser = jwt.verify(req.cookies.JWT, "MeetOswal");
    
            const user = await User.findOne({_id : verifyUser._id});
            const visited = user.visitedToday;
            let x = new Date();
            x = x.getDate();
    
            if(x !== user.lastLogined){
                await User.updateOne({_id : user._id},{
                    $set : {
                        visitedToday : []
                    }
                })
    
                await User.updateOne({_id : user._id},{
                    $push : {
                        visitedToday : req.params.novelid
                    }
                })
    
                await NOVEL.updateOne({_id : req.params.id},{
                    $inc : {
                        monthlyClicks : 1,
                        weeklyClicks : 1
                    }
                })
    
            return res.status(200).send();
    
            }else if(x === user.lastLogined && !visited.includes(req.params.novelid)){
                await User.updateOne({_id : user._id},{
                    $push : {
                        visitedToday : req.params.novelid
                    }
                })
    
                await NOVEL.updateOne({_id : req.params.id},{
                    $inc : {
                        monthlyClicks : 1,
                        weeklyClicks : 1
                    }
                })
    
                return res.status(200).send();
            }else{
                return res.status(200).send();   
            }
        }else{
            return res.status(400).send();
        }
    } catch (error) {
        return res.status(404).send();
    }
})

export default app;