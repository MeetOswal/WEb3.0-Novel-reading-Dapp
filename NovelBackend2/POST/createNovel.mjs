import express from "express"
import multer from "multer"
import Novel from "../databaseSchema/NovelCollection.mjs";
import User from "../databaseSchema/UserCollection.mjs";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express.Router();

const upload = multer();

app.use(cookieParser());

const uploadMultiple = upload.fields([
    {name : "novelName"},
    {name : "contractAddress"},
    {name : "genre"},
    {name : "description"}
])

app.post("/", uploadMultiple, async(req, res) => {

    try {
        if(req.cookies.JWT){

            const token = req.cookies.JWT;
            const user = jwt.verify(token, "MeetOswal");
            const userData =  await User.findOne({_id : user._id})  
            await new Novel({
                collectionAddress : req.body.contractAddress,
                novelName : req.body.novelName,
                novelCreator : userData.username,
                novelThumbnail : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fexplore%2Froyalty-free-images&psig=AOvVaw2lt3xCNlNVAwZAudJpyag7&ust=1668158135614000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCMjC3bijo_sCFQAAAAAdAAAAABAE",
                freeChapterCount : 0,
                chapterPrice : 0.00001,
                genre :  req.body.genre,
                description : req.body.description,
                weeklyClicks : 0,
                monthlyClicks : 0,
                status : "Ongoing"
            }).save();
        
            const response = {
                status : "true",
                data : `Successfull created ${req.body.novelName} by ${userData.username}`
            }
        
            return res.status(200).send(response)
            }else{
                const response = {
                    status : "Failure",
                    data : "User not found"
                }
                return res.send(200).send(response);
            }
    } catch (error) {
        
    }

})

export default app;