const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv').config()
const jwt = require('jsonwebtoken');

// Middlewares
app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.go3nt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


function verifyJWT(req, res, next) {
    // const email = req.params
    // console.log(email, 'from verify email func');
    // const token = jwt.sign(email, process.env.ACCESS_TOKEN);
    // if (token) {
    //     next()
    // }
}

// Run or initial function for mongodb
(async () => {
    try {
        await client.connect();
        const userCollection = client.db("carz_manufacturing_a12").collection("users");

        // Update or insert a user's api endpoint
        app.put('/user', async (req, res) => {
            const data = req.body;
            console.log(data.email);
            const token = jwt.sign({ email: data.email }, process.env.ACCESS_TOKEN);
            const query = { email: data.email }
            const options = { upsert: true };
            const updateDoc = {
                $set: data
            }
            const result = await userCollection.updateOne(query, updateDoc, options)
            res.send({ result, token })
        })


    }
    finally {

    }

})().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server Running on port ${port}`)
})