const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 5000
require("dotenv").config()

app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.qsjtvwz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {
    const allMovieCollection = client.db("movie-web-app").collection("allMovies")

    try {

        app.get("/get-all", async (req, res) => {
            const query = {}
            const result = await allMovieCollection.find(query).toArray()
            res.send(result)
        })

        app.get("/get-single/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await allMovieCollection.findOne(query)
            res.send(result)
        })

        app.post("/add-movie", async (req, res) => {
            const data = req.body
            const result = await allMovieCollection.insertOne(data)
            res.send(result)
        })



    } finally {

    }

}

run().catch(error => { console.log(error) })

app.get("/", async (req, res) => {
    res.send(`<h1>Movie server is running</h1>`)
})

app.listen(port, () => {
    console.log(`Movie server is running on http://localhost:${port}/`)
})