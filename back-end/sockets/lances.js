const Products = require('../model/products');

module.exports = (io) => {
  io.on('connection', (socket) => {
    // console.log(`Cliente ${socket.id} acabou de entrar`);
  
    socket.on('increaseLances', async ({ id }) => {
      await Products.increaseLances(id);
      const products = await Products.getById(id);
      io.emit('refreshCurrentLances', products);
  
      // socket.emit -> manda apenas para quem emitiu
      // io.emit -> manda para todos
      // socket.broadcast.emit -> manda para todos exceto quem emitiu.
    })
  });  
}
