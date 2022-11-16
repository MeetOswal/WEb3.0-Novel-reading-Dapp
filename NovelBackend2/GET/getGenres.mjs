import Genre from "../databaseSchema/GenreCollection.mjs";
import express, { response } from "express";

const app = express.Router();

app.get("/:page", async(req, res) => {

    try {
        const result = await Genre.find().skip(25 * (parseInt(req.params.page) - 1)).limit(25);
    let next = `localhost` 
    let previous = `localhost`
    if(req.params.page === "1"){
        previous = "null"
    }
    if(result.length < 100){
        next = "null"
    }

    response = {
        status : "success",
        data : result,
        next : next,
        previous : previous
    }

    return res.status(200).send(response);
    } catch (error) {
        response = {
            status : "failure",
            data : error.message
        }
    
        return res.status(400).send(response);
    }

})

export default app;