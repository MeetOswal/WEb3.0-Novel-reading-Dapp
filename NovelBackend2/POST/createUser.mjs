import User from "../databaseSchema/UserCollection.mjs";
import express from "express";
import multer from "multer";

const app = express.Router();

const upload = multer();

const uploadMultiple = upload.fields([
  { name: "userName" },
  { name: "walletAddress" },
]);

app.post("/", uploadMultiple, async (req, res) => {
  try {
    const result = await new User({
      username: req.body.userName,
      walletAddress: req.body.walletAddress,
      userImage:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AUserimage.png&psig=AOvVaw2zEl0vAMNxHvzWSUGcy557&ust=1668161169390000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCJj_896uo_sCFQAAAAAdAAAAABAE",
    }).save();

    const response = {
      status: "Success",
      data: result,
    };
    return res.status(200).send(response);
  } catch (error) {
    const response = {
      status: "Faliure",
      data: error.message,
    };
    return res.status(400).send(response);
  }
});

export default app;
