const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 5000
require("dotenv").config()

app.use(cors())
app.use(express.json())

app.get("/", async (req, res) => {
    res.send(`Movie server is running`)
})

app.listen(port, () => {
    console.log(`Movie server is running on http://localhost:${port}/`)
})