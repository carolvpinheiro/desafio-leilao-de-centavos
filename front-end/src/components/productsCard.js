import React, { useEffect, useState } from 'react';

import { Card, Button } from 'react-bootstrap';

const { io } = require("socket.io-client");
const socket = io('http://localhost:3001');


function ProductCard({ id, name, image, lances}) {
  const [currentLances, setCurrentLances] = useState(lances);

  useEffect(() => {
    socket.customId = `${id}-${name}`

    socket.on('refreshCurrentLances', (data) => {
      console.log(socket.customId);
      if (id === data._id) setCurrentLances(data.lances);
    })
  }, [id, name]);


  const handleClick = (e) => {
    socket.emit('increaseLances', { id });
    // setCurrentLances(votes + 1);
  }

  return (
    <Card>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title><span>{name}</span></Card.Title>
        <Card.Text>
          Lances: <span>{currentLances}</span>  
        </Card.Text>
        <Button onClick={handleClick}>Dar um lance</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;