import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/get-code", async (req, res) => {
    const searchCode = req.body.code;
    try {
        const result = await axios.get(`https://http.dog/${searchCode}.json`);
        res.render("index.ejs", { image: result.data.image.jpg });
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});