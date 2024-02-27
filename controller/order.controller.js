/**
 *
 * Place an order API's endpoint
 *
 **/
const placeOrder = async (req, res) => {
  const data = req.body;
  const result = await orderCollection.insertOne(data);
  res.send(result);
};

/**
 *
 * Get all order API's endpoint
 *
 **/
const getAllOrder = async (req, res) => {
  const query = {};
  const result = await orderCollection.find(query).toArray();
  res.send(result);
};

/**
 *
 * Get a Single order API's endpoint
 *
 **/
const getSingleOrder = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const result = await orderCollection.findOne(filter);
  res.send(result);
};

/**
 *
 * Delete a Single order API's endpoint
 *
 **/
const deleteSingleOrder = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const result = await orderCollection.deleteOne(filter);
  res.send(result);
};

/**
 *
 * Get a specific user order through email API's endpoint
 *
 **/
const getUserOrderByEmail = async (req, res) => {
  const email = req.params.email;
  const filter = { email: email };
  const result = await orderCollection.find(filter).toArray();
  res.send(result);
};

/**
 *
 * Get a specific user order through email API's endpoint
 *
 **/
const orderPaymentStatusUpdate = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = req.body;
  const filter = { _id: ObjectId(id) };
  const updateDoc = {
    $set: {
      payment_status: true,
      transactionId: data.transactionId,
    },
  };
  const result = await orderCollection.updateOne(filter, updateDoc);
  res.send(result);
};
