import User from "../databaseSchema/UserCollection.mjs";
import express from "express";
import multer from "multer";
import cookieParser from "cookie-parser";

const app = express.Router();

app.use(cookieParser());

const upload = multer();

app.post("/", upload.single("walletAddress"), async (req, res) => {
  try {
    const userLogin = await User.findOne({
      walletAddress: req.body.walletAddress,
    });

    if (userLogin) {
      const response = {
        status: "Success",
        data: "Loged in",
      };

      let x = new Date();
      x = x.getDate();
      await User.updateOne(
        { _id: userLogin._id },
        {
          $set: {
            lastLogined: x,
          },
        }
      );
      const token =
        await userLogin.generateAuthToken(); /*Cooment these lines for Postman*/
      return res
        .status(200)
        .cookie("JWT", token, {
          httpOnly: true,
          maxAge: 2592000000 /* sameSite : "none", secure : true*/,
        })
        .send(response);
    } else {
      const response = {
        status: "Failure",
        data: `user not exist`,
      };

      return res.status(200).send(response);
    }
  } catch (error) {
    const response = {
      status: "Faliure",
      data: error.message,
    };
    return res.status(400).send(response);
  }
});

export default app;
