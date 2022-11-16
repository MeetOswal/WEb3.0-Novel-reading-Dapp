import NOVEL from "../databaseSchema/NovelCollection.mjs";
import express from "express";

const app = express.Router();

app.get("/:genre/s", async (req, res) => {
  try {
    let result, next, previous;
    if (req.query.page) {
      result = await NOVEL.find({ genre: req.params.genre })
        .sort({ lastUpdate: 1 })
        .select({ novelName: 1, novelThumbnail: 1, lastUpdate: 1 })
        .skip(20 * (req.query.page - 1))
        .limit(20);

      next = `localhost`;
      previous = `localhost`;
      if (result.length < 20) {
        next = "null";
      }
      if (req.query.page === "1") {
        previous = "null";
      }
    } else {
      result = await NOVEL.find({ genre: req.params.genre })
        .sort({ lastUpdate: 1 })
        .select({ novelName: 1, novelThumbnail: 1, lastUpdate: 1 })
        .limit(20);

      next = `localhost`;
      previous = "null";
      previous = `localhost`;
      if (result.length < 20) {
        next = "null";
      }
    }

    const response = {
      status: "Success",
      data: result,
    };

    return res.status(200).send(response);
  } catch (error) {
    const response = {
      status: "Success",
      data: error.message,
    };

    return res.status(200).send(response);
  }
});

export default app;
