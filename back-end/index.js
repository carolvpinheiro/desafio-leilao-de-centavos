const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;
const server = require('http').createServer(app);


const Products = require('../back-end/model/products');

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET','POST']
  }
});

// io.on('conection', (soket) => {
//   console.log(`Usuário conectado ${socket.id}`);
// })

// const votesSocket = require('./sockets/votesSocket');
// votesSocket(io);


var corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

app.get('/products', async (req, res) => {
  const products = await Products.getAll();
  res.status(200).json(products);
});

server.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`)) 