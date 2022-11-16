import cookieParser from "cookie-parser";
import express from "express";

const app = express.Router();

app.use(cookieParser());

app.get("/", (req, res) => {
  try {
    if (req.cookies.JWT) {
      const response = {
        status: "Success",
        data: "User loged out",
      };
      /*Comment this part in Postman*/
      return res
        .status(200)
        .cookie("JWT", "", {
          httpOnly: true,
          maxAge: -60,
          sameSite: "none",
          secure: true,
        })
        .send(response);
    } else {
      const response = {
        status: "Faliure",
        data: "Not loged In",
      };

      return res.status(200).send(response);
    }
  } catch (error) {
    const response = {
      status: "Failure",
      data: error.message,
    };
    res.status(400).send(response);
  }
});

export default app;
