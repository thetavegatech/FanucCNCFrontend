// src/components/BreakdownForm.js
import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

const BreakdownForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    MACHINE_NAME: '',
    BREAKDOWN_TYPE: '',
    BREAKDOWN_DETAILS: '',
    START_TIME: '',
    END_TIME: '',
    STATUS: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/breakdowns', formData);
      onAdd(response.data);
      setFormData({
        MACHINE_NAME: '',
        BREAKDOWN_TYPE: '',
        BREAKDOWN_DETAILS: '',
        START_TIME: '',
        END_TIME: '',
        STATUS: '',
      });
    } catch (error) {
      console.error('Error adding breakdown:', error);
    }
  };

  return (
    <div className='container-flex'>
      
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>MACHINE_NAME</Form.Label>
            <Form.Control
              type="text"
              name="MACHINE_NAME"
              value={formData.MACHINE_NAME}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>BREAKDOWN_TYPE</Form.Label>
            <Form.Control
              type="text"
              name="BREAKDOWN_TYPE"
              value={formData.BREAKDOWN_TYPE}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>BREAKDOWN_DETAILS</Form.Label>
            <Form.Control
              type="text"
              name="BREAKDOWN_DETAILS"
              value={formData.BREAKDOWN_DETAILS}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>START_TIME</Form.Label>
            <Form.Control
              type="datetime-local"
              name="START_TIME"
              value={formData.START_TIME}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>END_TIME</Form.Label>
            <Form.Control
              type="datetime-local"
              name="END_TIME"
              value={formData.END_TIME}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>STATUS</Form.Label>
            <Form.Control
              type="text"
              name="STATUS"
              value={formData.STATUS}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Button className='m-3' variant="primary" type="submit">Add Breakdown</Button>
    </Form>


    </div>

  );
};

export default BreakdownForm;
