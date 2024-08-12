import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DummyOee = () => {

  const [data, setData] = useState(null);
  const [rejectedCount, setRejectedCount] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [quality, setQuality] = useState(null);
  const [oee, setOEE] = useState(null);

  const [duration, setDuration] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API
        const response = await axios.get('http://localhost:5001/api/breakdowns');
        const data = response.data; // Store response data in a constant

        // Process the data
        if (data.length > 0) {
          setDuration(data[0].DURATION_MINUTES);
        } else {
          setDuration(0); // If no data, default to 0 or handle as needed
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }

    fetchData();
  }, []);

  // console.log(duration)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get('http://localhost:5001/api/cnc1productiondata/last');
        const response2 = await axios.get('http://localhost:5001/api/cnc1productiondata/letestRejectedCount');

        const productionData = response1.data;
        const rejectedCountData = response2.data['REJECTED COUNT'];

        setData(productionData);
        setRejectedCount(rejectedCountData);

        calculateOEE(productionData, rejectedCountData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateOEE = (data, rejectedCount) => {
    const totalRunTime = 8; // Assume 8 hours for simplicity
    const operatingTime = 8; // Assume 8 hours for simplicity
    const totalJobs = parseInt(data['TOTAL PART COUNT']);
    const actualJobs = parseInt(data['PART COUNT']);
    const rejectedJobs = parseInt(rejectedCount);
    const goodJobs = actualJobs - rejectedJobs;

    // Calculate Availability
    const availability = operatingTime / totalRunTime;

    // Calculate Performance
    const idealProductionRate = totalJobs / totalRunTime;
    const actualProductionRate = actualJobs / operatingTime;
    const performance = actualProductionRate / idealProductionRate;

    // Calculate Quality
    const quality = goodJobs / actualJobs;

    // Calculate OEE
    const oee = availability * performance * quality;

    setAvailability(availability);
    setPerformance(performance);
    setQuality(quality);
    setOEE(oee);
  };




  return (
    <div>
      <h1>OEE Calculator</h1>
      {data ? (
        <div>
          <p><strong>Total Run Time:</strong> 8 hours</p>
          <p><strong>Operating Time:</strong> 8 hours</p>
          <p><strong>Total Jobs (TOTAL PART COUNT):</strong> {data['TOTAL PART COUNT']}</p>
          <p><strong>Actual Jobs (PART COUNT):</strong> {data['PART COUNT']}</p>
          <p><strong>Rejected Jobs (REJECTED COUNT):</strong> {rejectedCount}</p>
          <p><strong>Good Jobs:</strong> {parseInt(data['PART COUNT']) - parseInt(rejectedCount)}</p>
          <hr />
          <p><strong>Availability:</strong> {(availability * 100).toFixed(2)}%</p>
          <p><strong>Performance:</strong> {(performance * 100).toFixed(2)}%</p>
          <p><strong>Quality:</strong> {(quality * 100).toFixed(2)}%</p>
          <hr />
          <h2><strong>OEE:</strong> {(oee * 100).toFixed(2)}%</h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};



export default DummyOee;