const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv').config()
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

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
        client.connect();
        const userCollection = client.db("carz_manufacturing_a12").collection("users");
        const productCollection = client.db("carz_manufacturing_a12").collection("products");
        const orderCollection = client.db("carz_manufacturing_a12").collection("orders");
        const reviewCollection = client.db("carz_manufacturing_a12").collection("reviews");


        // Verification of admin
        const adminVerification = async (req, res, next) => {
            const requesterEmail = req.decoded.email
            const filter = ({ email: requesterEmail })
            const requesterVerify = await userCollection.findOne(filter)
            if (requesterVerify.role == 'admin') {
                next()
            } else {
                res.status(403).send({ msg: 'Forbidden' })
            }
        }

        // Stripe integretion api
        app.post('/create-payment-intent', verifyJWT, async (req, res) => {
            const service = req.body;
            const price = service?.price;
            const amount = parseInt(price) * 100;
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: 'usd',
                payment_method_types: ['card']
            });
            res.send({
                clientSecret: paymentIntent.client_secret
            })
        });

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


        // Get all user api endpoint
        app.patch('/updateUser/:email', async (req, res) => {
            const email = req.params.email
            const data = req.body
            const filter = ({ email: email })
            const updateDoc = {
                $set: data
            }
            const result = await userCollection.updateOne(filter, updateDoc)
            res.send(result)
        })

        // Make a admin
        app.put('/makeAdmin/:email', verifyJWT, adminVerification, async (req, res) => {
            const id = req.body.id
            const email = req.params.email
            const query = ({ email: email })
            const role = req.body.role
            const filter = ({ _id: ObjectId(id) })
            const isAdmin = await userCollection.findOne(query)
            if (isAdmin.role == 'admin') {
                const options = { upsert: true };
                const updateDoc = {
                    $set: {
                        role: role
                    }
                }
                const result = await userCollection.updateOne(filter, updateDoc, options)
                return res.send({ result })
            }


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
        app.get('/products/latest', async (req, res) => {
            const query = {}
            const cursor = await productCollection.find().limit(4).sort({ $natural: -1 })
            const result = await cursor.toArray();
            res.send(result)
        })

        // Getting or find a specific product
        app.delete('/product/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await productCollection.deleteOne(query)
            res.send(result)
        })


        // Insert a order api endpoint
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

        // Get a specific order 
        app.get('/orders/:id', async (req, res) => {
            const id = req.params.id
            const filter = ({ _id: ObjectId(id) })
            const result = await orderCollection.findOne(filter)
            res.send(result)
        })

        // Delete a specific order 
        app.delete('/order/:id', async (req, res) => {
            const id = req.params.id
            const filter = ({ _id: ObjectId(id) })
            const result = await orderCollection.deleteOne(filter)
            res.send(result)
        })

        // Get a specific user orders api end point
        app.get('/order/:email', async (req, res) => {
            const email = req.params.email
            const filter = ({ email: email })
            const result = await orderCollection.find(filter).toArray()
            res.send(result)
        })

        // Get a specific user orders api end point
        app.get('/order/:email', async (req, res) => {
            const email = req.params.email
            const filter = ({ email: email })
            const result = await orderCollection.find(filter).toArray()
            res.send(result)
        })

        // Payment status update api endpoint
        app.patch('/order/:id', async (req, res) => {
            const id = req.params.id
            console.log(id)
            const data = req.body
            const filter = { _id: ObjectId(id) }
            const updateDoc = {
                $set: {
                    payment_status: true,
                    transactionId: data.transactionId
                }
            }
            const result = await orderCollection.updateOne(filter, updateDoc)
            res.send(result)
        })

        // Insert review api endpoint
        app.post('/review', async (req, res) => {
            const data = req.body
            const result = await reviewCollection.insertOne(data)
            res.send(result)
        })

        // Get reviews api end point
        app.get('/review', async (req, res) => {
            const query = {}
            const result = await reviewCollection.find(query).toArray()
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