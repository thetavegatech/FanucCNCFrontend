import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BreakSummery = () => {
  const [breakdowns, setBreakdowns] = useState([]);
  const [formData, setFormData] = useState({
    MACHINE_NAME: '',
    BREAKDOWN_TYPE: '',
    BREAKDOWN_DETAILS: '',
    START_TIME: '',
    END_TIME: '',
    STATUS: 'Pending',
  });

  useEffect(() => {
    fetchBreakdowns();
  }, []);

  const fetchBreakdowns = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/breakdowns');
      setBreakdowns(response.data);
    } catch (error) {
      console.error('Error fetching breakdowns:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data before submission:', formData);
    try {
      const response = await axios.post('http://localhost:5001/api/breakdowns', formData);
      setBreakdowns([...breakdowns, response.data]);
      setFormData({
        MACHINE_NAME: '',
        BREAKDOWN_TYPE: '',
        BREAKDOWN_DETAILS: '',
        START_TIME: '',
        END_TIME: '',
        STATUS: 'Pending',
      });
    } catch (error) {
      console.error('Error submitting breakdown:', error);
    }
  };

  const deleteBreakdown = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/breakdowns/${id}`);
      setBreakdowns(breakdowns.filter(breakdown => breakdown.ID !== id));
    } catch (error) {
      console.error('Error deleting breakdown:', error);
    }
  };

  return (
    <Container>
      <h2 className='m-2 mb-4'><center>Add New Breakdown</center></h2>
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
                required
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
                required
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
                required
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
                required
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
                as="select"
                name="STATUS"
                value={formData.STATUS}
                onChange={handleChange}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button className='m-3' variant="primary" type="submit">
          Add Breakdown
        </Button>
      </Form>

      <h2>Breakdown List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>MACHINE_NAME</th>
            <th>BREAKDOWN_TYPE</th>
            <th>BREAKDOWN_DETAILS</th>
            <th>START_TIME</th>
            <th>END_TIME</th>
            <th>STATUS</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {breakdowns.map((breakdown, index) => (
            <tr key={breakdown.ID}>
              <td>{index + 1}</td> {/* Series Number */}
              <td>{breakdown.MACHINE_NAME}</td>
              <td>{breakdown.BREAKDOWN_TYPE}</td>
              <td>{breakdown.BREAKDOWN_DETAILS}</td>
              <td>{breakdown.START_TIME}</td>
              <td>{breakdown.END_TIME}</td>
              <td>{breakdown.STATUS}</td>
              <td>
                <Link to={`/EditBreakdown/${breakdown.ID}`}>
                  <Button variant="warning">Edit</Button>
                </Link>{' '}
                <Button variant="danger" onClick={() => deleteBreakdown(breakdown.ID)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default BreakSummery;
