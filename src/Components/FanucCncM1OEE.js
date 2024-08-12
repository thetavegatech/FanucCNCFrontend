import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import PartCountStackedChart from './WeekWiseChart';

const FanucCncM1OEE = () => {
    const [currentDateTime, setCurrentDateTime] = useState(moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'));
    const [rejectedCountApi, setRejectedCountApi] = useState(0);
    const [data, setData] = useState(null);
    const [duration, setDuration] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch production and breakdown data
                const [productionResponse, rejectedResponse, breakdownResponse] = await Promise.all([
                    axios.get('http://localhost:5001/api/cnc1productiondata/last'),
                    axios.get('http://localhost:5001/api/cnc1productiondata/letestRejectedCount'),
                    axios.get('http://localhost:5001/api/breakdowns')
                ]);

                setData(productionResponse.data);
                // setRejectedCountApi(rejectedResponse.data['REJECTED COUNT']);
                const rejectedCount = rejectedResponse.data?.['REJECTED COUNT'] ?? 0;

            if (rejectedCount === 0) {
                setRejectedCountApi(0);
            } else if (rejectedCount > 0) {
                setRejectedCountApi(rejectedResponse.data['REJECTED COUNT']);
            }
                
                if (breakdownResponse.data.length > 0) {
                    setDuration(breakdownResponse.data[0].DURATION_MINUTES);
                } else {
                    setDuration(0);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        // Initial fetch and set interval for data refresh
        fetchData();
        const interval = setInterval(fetchData, 10000);

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;
    if (!data) return <p>No data available</p>;

    const partCount = parseInt(data["PART COUNT"], 10);
    const totalPartCount = parseInt(data["TOTAL PART COUNT"], 10);
    const remainingParts = totalPartCount - partCount - rejectedCountApi;

    const series = [partCount, remainingParts];
    const options = {
        chart: { type: 'donut' },
        labels: ['Part Count', 'Remaining Parts'],
        title: { text: `Model Name: ${data["MODEL NAME"]}` }
    };

    // OEE calculations
    const plannedProductionTime = 480; // 8 hours in minutes
    const operatingTime = plannedProductionTime - duration;
    const availability = operatingTime / plannedProductionTime;
    const performance = partCount / totalPartCount ; // Simplified performance calculation
    const quality = (totalPartCount - rejectedCountApi) / totalPartCount;
    const oee = availability * performance * quality;

    return (
        <div className='container-fluid'>
            <div className='row mt-3 m-3 p-2' style={{ height: "5rem", backgroundColor: "#03C03C", color: "white" }}>
                <div className='col'>
                    <h6>Operator Name:</h6>
                    <h6>Current Shift:</h6>
                </div>
                <div className='col-8'>
                    <h4><center>Fanuc CNC Machine</center></h4>
                </div>
                <div className='col'>
                    <h6>{currentDateTime}</h6>
                    <h6>Cycle Time</h6>
                </div>
            </div>
            <div className='row m-3'>
                <div className='col-3 m-3'>
                    <Chart options={options} series={series} type="donut" width="380" />
                    <div className='row'>
                        <div className='col-6'>
                            <div style={{ marginTop: '20px' }}>
                                <p><strong>Part Count:</strong> {partCount}</p>
                                <p><strong>Remaining Part:</strong> {remainingParts}</p>
                            </div>
                        </div>
                        <div className='col'>
                            <div style={{ marginTop: "20px" }}>
                                <p><strong>Total Count:</strong> {totalPartCount}</p>
                                <p><strong>Rejected Count:</strong> {rejectedCountApi}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-4 m-3'>
                    <div className="card text-white bg-dark">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                    <div className="mb-2">
                                        <h6 className="card-subtitle mb-2">Production Min: 480 Min</h6>
                                    </div>
                                    <div className="mb-2">
                                        <h6 className="card-subtitle mb-2">Downtime: {duration} Min</h6>
                                    </div>
                                    <div className="mb-2">
                                        <h6 className="card-subtitle mb-2">Operating Time: {operatingTime} Min</h6>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="mb-2">
                                        <h6 className="card-subtitle mb-2">Total Count: {totalPartCount}</h6>
                                    </div>
                                    <div className="mb-2">
                                        <h6 className="card-subtitle mb-2">Good Count: {partCount}</h6>
                                    </div>
                                    <div className="mb-2">
                                        <h6 className="card-subtitle mb-2">Rejected Count: {rejectedCountApi}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-4 mt-5">
                            <div className="text-black mt-3">
                                <div className="card-body">
                                    <h3 className="card-text" style={{ fontWeight: "bold" }}>{(oee * 100).toFixed(2)}%</h3>
                                    <h5 className="card-title" style={{ fontWeight: "bold", marginLeft: "2rem" }}>OEE</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-8 mt-3">
                            <div className="row mb-2">
                                <div className="col-12">
                                    <h5><center>Availability</center></h5>
                                    <div className="progress">
                                        <div className="progress-bar bg-info" role="progressbar" style={{ width: `${availability * 100}%` }} aria-valuenow={availability * 100} aria-valuemin="0" aria-valuemax="100">
                                            {(availability * 100).toFixed(2)}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-12">
                                    <h5><center>Performance</center></h5>
                                    <div className="progress">
                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${performance * 100}%` }} aria-valuenow={performance * 100} aria-valuemin="0" aria-valuemax="100">
                                            {(performance * 100).toFixed(2)}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-12">
                                    <h5><center>Quality</center></h5>
                                    <div className="progress">
                                        <div className="progress-bar bg-success" role="progressbar" style={{ width: `${quality * 100}%` }} aria-valuenow={quality * 100} aria-valuemin="0" aria-valuemax="100">
                                            {(quality * 100).toFixed(2)}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-4 m-3'>
                    <PartCountStackedChart />
                </div>
            </div>
            <div>
                <button className='btn btn-dark'>
                    <NavLink to="/breakdownsummary" style={{ textDecoration: "none", color: "white" }}>Show Breakdown</NavLink>
                </button>
            </div>
        </div>
    );
}

export default FanucCncM1OEE;
