const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv').config()

// Middlewares
app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.go3nt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// Run or initial function for mongodb
(async () => {
    try {
        await client.connect();
        const userCollection = client.db("carz_manufacturing_a12").collection("users");


        // Update or insert a user's api endpoint
        app.put('/user', async (req, res) => {
            const data = req.body;
            console.log(data);
            const query = { email: data.email }
            const options = { upsert: true };
            const updateDoc = {
                $set: data
            }
            const result = await userCollection.updateOne(query, updateDoc, options)
            res.send(result)
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