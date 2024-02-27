/**
 *
 * Add or insert product API's endpoint
 *
 **/
const addProduct = async (req, res) => {
  const data = req.body;
  const result = await productCollection.insertOne(data);
  res.send(result);
};

/**
 *
 * Get All product API's endpoint
 *
 **/
const getAllProduct = async (req, res) => {
  const query = {};
  const result = await productCollection.find(query).toArray();
  res.send(result);
};

/**
 *
 * Get a Single product API's endpoint
 *
 **/
const getASingleProduct = async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await productCollection.findOne(query);
  res.send(result);
};

/**
 *
 * Get Latest product API's endpoint
 *
 **/
const getLatestProduct = async (req, res) => {
  const query = {};
  const cursor = await productCollection.find().sort({ $natural: -1 });
  const result = await cursor.toArray();
  res.send(result);
};

/**
 *
 * Delete a single product API's endpoint
 *
 **/
const deleteSingleProduct = async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await productCollection.deleteOne(query);
  res.send(result);
};

