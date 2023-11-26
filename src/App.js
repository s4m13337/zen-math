import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import Sidebar from './sidebar';
import Canvas from './canvas.js';

function App() {
  return (
    <Container fluid>
      <Row>
        <Sidebar />
        <Canvas />
      </Row>
    </Container>
  );
}

export default App;
