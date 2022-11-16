import User from "../databaseSchema/UserCollection.mjs";
import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express.Router();
app.use(cookieParser());



app.patch("/:novelid", async (req, res) => {
  try {
    if(req.cookies.JWT){
        const user = jwt.verify(req.cookies.JWT, "MeetOswal");

        const exist = await User.findOne({_id : user._id, bookmarks :  req.params.novelid});

        if(!exist){
            await User.updateOne(
                { _id: user._id },
                {
                  $push :{
                      bookmarks : req.params.novelid
                  }
                }
              );
          
              await Playlist.updateOne({_id : req.params.novelid},{
                  $inc : {
                      bookmarkCount : 1
                  }
              })
          
        }else{
            await User.updateOne(
                { _id: user._id },
                {
                  $pull :{
                      bookmarks : req.params.novelid
                  }
                }
              );
          
              await Playlist.updateOne({_id : req.params.novelid},{
                  $inc : {
                      bookmarkCount : -1
                  }
              })
        }

    
    const response = {
        status : "Success",
        data : "success"
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