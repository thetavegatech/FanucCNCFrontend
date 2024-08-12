import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const EditBreakdown = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const [breakdown, setBreakdown] = useState({
    MACHINE_NAME: '',
    BREAKDOWN_TYPE: '',
    BREAKDOWN_DETAILS: '',
    START_TIME: '',
    END_TIME: '',
    STATUS: 'Pending', // Default value
  });

  useEffect(() => {
    const fetchBreakdown = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/breakdowns/${id}`);
        setBreakdown(response.data); // Set the response data directly
      } catch (error) {
        console.error('Error fetching breakdown:', error);
      }
    };

    fetchBreakdown();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBreakdown({ ...breakdown, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/breakdowns/${id}`, breakdown); // Submit the data as is
      navigate('/breakdownsummary');
    } catch (error) {
      console.error('Error updating breakdown:', error);
    }
  };

  return (
    <Container>
      <h2>Edit Breakdown</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>MACHINE_NAME</Form.Label>
              <Form.Control
                type="text"
                name="MACHINE_NAME"
                value={breakdown.MACHINE_NAME}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>BREAKDOWN_TYPE</Form.Label>
              <Form.Control
                type="text"
                name="BREAKDOWN_TYPE"
                value={breakdown.BREAKDOWN_TYPE}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>BREAKDOWN_DETAILS</Form.Label>
              <Form.Control
                type="text"
                name="BREAKDOWN_DETAILS"
                value={breakdown.BREAKDOWN_DETAILS}
                readOnly
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
                value={breakdown.START_TIME.slice(0, 16)} // Format to 'YYYY-MM-DDTHH:mm'
                readOnly
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>END_TIME</Form.Label>
              <Form.Control
                type="datetime-local"
                name="END_TIME"
                value={breakdown.END_TIME ? breakdown.END_TIME.slice(0, 16) : ''}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>STATUS</Form.Label>
              <Form.Control
                as="select"
                name="STATUS"
                value={breakdown.STATUS}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button className='m-3' variant="primary" type="submit">Update Breakdown</Button>
      </Form>
    </Container>
  );
};

export default EditBreakdown;
