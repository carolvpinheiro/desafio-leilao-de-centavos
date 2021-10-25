const connection = require('./connect');
const { ObjectID } = require("mongodb");

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find({}).toArray();
  return products;
};

const getById = async (id) => {
  const db =  await connection();
  const products = db.collection('products').findOne({ _id: ObjectID(id) });
  return products;
};

const increaseLances = async (id) => {
  const db =  await connection();
  db.collection('products').updateOne(
    { _id : ObjectID(id) },
    { $inc: { lances: 5 } }
  );
}

module.exports = {
  getAll,
  getById,
  increaseLances,
}