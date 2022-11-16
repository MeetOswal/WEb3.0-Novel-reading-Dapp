import User from "../databaseSchema/UserCollection.mjs";
import NOVEL from "../databaseSchema/NovelCollection.mjs";
import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express.Router();
app.use(cookieParser());

app.patch("/:novelid/:star", async (req, res) => {
  try {
    if(req.cookies.JWT){
        const user = jwt.verify(req.cookies.JWT, "MeetOswal");

        const exist = await User.findOne({_id : user._id, "stars.novel" :req.params.novelid})

        if(exist){
            await User.updateOne({_id : user._id},{
                $set : {
                    "stars.$[addressFilter].stars" : req.params.star,
                }
            },{
                "arrayFilters": [
                    {
                        "stars.novel" : req.params.novelid
                    }
                ],"multi":true

            })

        }else{
            await User.updateOne({
                _id : user._id
            },{
                $push : {
                    stars : {
                        novel : req.params.novelid,
                        stars : req.params.star
                    }
                }
            })
        }

        const users = await User.find({"stars.novel" : req.params.novelid}).select({stars : 1, _id : 0});
        let sum = 0
        for(const obj of users){
            sum += obj.stars.stars
        }
        const avg = Math.floor(sum / users.length)
        const current = await NOVEL.updateOne({_id : req.params.novelid},{
            $set : {
                stars : avg 
            }
        })
    
    const response = {
        status : "Success",
        data : current
    }

    return res.status(200).send(response);
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