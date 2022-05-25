const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv').config()
const jwt = require('jsonwebtoken');

// Middlewares
app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const productCollection = client.db("carz_manufacturing_a12").collection("products");
        const orderCollection = client.db("carz_manufacturing_a12").collection("orders");
        const reviewCollection = client.db("carz_manufacturing_a12").collection("reviews");

        // Update or insert a user's api endpoint
        app.put('/user', async (req, res) => {
            const data = req.body;
            const token = jwt.sign({ email: data.email }, process.env.ACCESS_TOKEN);
            const query = { email: data.email }
            const user = await userCollection.findOne(query)

            if (!user) {
                const options = { upsert: true };
                const updateDoc = {
                    $set: data
                }
                const result = await userCollection.updateOne(query, updateDoc, options)
                return res.send({ result, token })
            }
            return res.send({ token })

        })

        // Get user api endpoint
        app.get('/user/:email', verifyJWT, async (req, res) => {
            const userEmail = req.params.email
            const { email } = req.decoded
            if (email === userEmail) {
                const query = { email: email };
                const result = await userCollection.findOne(query)
                res.send(result)
            } else {
                return res.status(403).send({ msg: 'Access denied' })
            }
        })



        // Get all user api endpoint
        app.get('/user', async (req, res) => {
            const query = {}
            const result = await userCollection.find(query).toArray()
            res.send(result)
        })

        // Post or add a product api endpoint
        app.post('/product', async (req, res) => {
            const data = req.body
            const result = await productCollection.insertOne(data);
            res.send(result)
        })

        // Get all products api endpoint
        app.get('/product', async (req, res) => {
            const query = {}
            const result = await productCollection.find(query).toArray()
            res.send(result)
        })

        // Getting or find a specific product
        app.get('/product/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await productCollection.findOne(query)
            res.send(result)
        })

        // Get latest 6 products api endpoint
        app.get('/product/latest', async (req, res) => {
            const query = {}
            const result = await productCollection.find(query).sort({ _id: 1 }).limit(6).toArray();
            res.send(result)
        })

        // Inser a order api endpoint
        app.post('/order', async (req, res) => {
            const data = req.body
            const result = await orderCollection.insertOne(data)
            res.send(result)
        })

        // Get all orders for admin api end point
        app.get('/order', async (req, res) => {
            const query = {}
            const result = await orderCollection.find(query).toArray()
            res.send(result)
        })

        // Get a specific user orders api end point
        app.get('/order/:email', async (req, res) => {
            const email = req.params.email
            const filter = ({ email: email })
            const result = await orderCollection.find(filter).toArray()
            res.send(result)
        })

        // Inser review api endpoint
        app.post('/review', async (req, res) => {
            const data = req.body
            const result = await reviewCollection.insertOne(data)
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