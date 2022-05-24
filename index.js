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


// Verify JWT Token
const verifyJWT = (req, res, next) => {
    const auth = req.headers.authorization
    if (auth) {
        const TOKEN = auth.split(' ')[1]
        jwt.verify(TOKEN, process.env.ACCESS_TOKEN, TOKEN, function (err, decoded) {
            if (err) {
                return res.status(403).send({ msg: 'Access Denied' })
            } else {
                req.decoded = decoded
                next()
            }

        });
    } else {
        return res.status(401).send({ msg: 'Unathorized Access' })
    }
}

// Run or initial function for mongodb
(async () => {
    try {
        await client.connect();
        const userCollection = client.db("carz_manufacturing_a12").collection("users");

        // Update or insert a user's api endpoint
        app.put('/user', async (req, res) => {
            const data = req.body;
            const token = jwt.sign({ email: data.email }, process.env.ACCESS_TOKEN);
            const query = { email: data.email }
            const options = { upsert: true };
            const updateDoc = {
                $set: data
            }
            const result = await userCollection.updateOne(query, updateDoc, options)
            res.send({ result, token })
        })

        app.get('/user/:email', verifyJWT, async (req, res) => {
            const userEmail = req.params.email
            const { email } = req.decoded
            if (email == email) {

            } 
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