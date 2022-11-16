import NOVEL from "../databaseSchema/NovelCollection.mjs";
import User from "../databaseSchema/UserCollection.mjs";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import multer from "multer";
import express from "express";

const app = express.Router();
const upload = multer();

app.use(cookieParser());

app.patch("/:novelid", upload.single("chapterName"), async (req, res) => {
  try {
    if (req.cookies.JWT) {
      const verifyUser = jwt.verify(req.cookies.JWT, "MeetOswal");
      const novelCreator = await NOVEL.findOne({ _id: req.params.novelid });
      const user = await User.findOne({ _id: verifyUser._id });
      if (user.username === novelCreator.novelCreator) {
        await NOVEL.updateOne(
          { _id: req.params.novelid },
          {
            $inc: {
              chapterCount: 1,
            },
            $push: {
              ChapterUpdates: {
                chapter: novelCreator.chapterCount + 1,
                chapterTitle: req.body.chapterName,
                updatedOn: Date.now(),
              },
            },
            $set : {
              lastUpdate : Date.now()
            }
          }
        );
      }

      if (req.body.chapter === 1) {
        await User.updateOne(
          {
            _id: user._id,
          },
          {
            $push: {
              subscribed: {
                novleName: req.body.novel,
                chapter: req.body.chapter,
              },
            },
          }
        );
      } else {
        await User.updateOne(
          { _id: user._id },
          {
            $set: {
              "subscribed.$[addressFilter].chapter": novelCreator.chapterCount + 1,
            },
          },
          {
            arrayFilters: [
              {
                "subscribed.novelName": novelCreator.novelName,
              },
            ],
            multi: true,
          }
        );
      }

      const response = {
        status: "success",
        data: "success",
      };
      return res.status(200).send(response);
    }
  } catch (error) {
    const response = {
      status: "failure",
      data: error.message,
    };
    return res.status(200).send(response);
  }
});

export default app;
