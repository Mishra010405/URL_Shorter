const express =  require('express');
const {connectToMongodb}  = require("./connection.js")
const router = require('./routes/url.routes.js')
const URL = require("./models/url");
const cors = require("cors");




// const router = require('./routes/url.routes.js') 

const app = express();

const PORT = 8001;

app.use(cors());


connectToMongodb("mongodb+srv://shivam05:Mishra010405@cluster0.3nlkglu.mongodb.net/Sortest-URL")
.then(() => {
    console.log("Mongodb Connected");
    
})

app.use(express.json())

app.use("/url", router);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        },
        { new: true }
    );

    if (!entry) {
        return res.status(404).json({ error: "Not found" });
    }

    res.redirect(entry.redirectUrl);
});

console.log("URL Model:", URL);



app.listen(PORT , () => {
    console.log(`The server is runnit on this ${PORT}`);
    
})