const { nanoid } = require('nanoid');
const URL = require("../models/url.js");

async function handlegrenratenewurl(req, res) {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: "Url is required" });
    }
    console.log("BODY:", req.body);

    const shortId = nanoid(8);

    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
    });

    return res.json({ id: shortId });
}

module.exports = {
    handlegrenratenewurl,
};
