import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
// import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';

const FanucCncM1 = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/cnc1letestrecord');
        console.log(response)
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(interval);

  }, []);


  return (
    <div className='container mt-3'>
      {data ? (
        <div className='row'>
          <center>Fanuc CNC Machine</center>
          <div className=''>
            <button className='btn btn-dark'>
              <NavLink to="/fanuccncoee" style={{color : "white" , textDecoration : "none"}}>Show OEE</NavLink>
            </button>
            </div>
          <div className='col m-3'>
            <div className='row'>
              <div className='col-5 pt-2 border-1 border-info m-1 round' style={{ backgroundColor: "#73BAD7" }}>
                <h6> <center>SPINDEL-1 LOAD</center></h6>
              </div>
              <div className='col-3 pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>60 &nbsp; %</center></h6>
              </div>
              <div className='col-3  pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>{data["SPINDEL-1 LOAD"]}</center></h6>
              </div>
            </div>
            <div className='row'>
              <div className='col-5 pt-2 border-1 border-info m-1 round' style={{ backgroundColor: "#73BAD7" }}>
                <h6> <center>SERVO 1 LOAD</center></h6>
              </div>
              <div className='col-3 pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>60 &nbsp; %</center></h6>
              </div>
              <div className='col-3  pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>{data["SERVO 1 LOAD"]}</center></h6>
              </div>
            </div>
            <div className='row'>
              <div className='col-5 pt-2 border-1 border-info m-1 round' style={{ backgroundColor: "#73BAD7" }}>
                <h6> <center>SERVO 2 LOAD</center></h6>
              </div>
              <div className='col-3 pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>60 &nbsp; %</center></h6>
              </div>
              <div className='col-3  pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>{data["SERVO 2 LOAD"]}</center></h6>
              </div>
            </div>
            <div className='row'>
              <div className='col-5 pt-2 border-1 border-info m-1 round' style={{ backgroundColor: "#73BAD7" }}>
                <h6> <center>SERVO 3 LOAD</center></h6>
              </div>
              <div className='col-3 pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>60 &nbsp; %</center></h6>
              </div>
              <div className='col-3  pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>{data["SERVO 3 LOAD"]}</center></h6>
              </div>
            </div>
            <div className='row'>
              <div className='col-5 pt-2 border-1 border-info m-1 round' style={{ backgroundColor: "#73BAD7" }}>
                <h6> <center>SERVO 4 LOAD</center></h6>
              </div>
              <div className='col-3 pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>60 &nbsp; %</center></h6>
              </div>
              <div className='col-3  pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>{data["SERVO 4 LOAD"]}</center></h6>
              </div>
            </div>
            <div className='row'>
              <div className='col-5 pt-2 border-1 border-info m-1 round' style={{ backgroundColor: "#73BAD7" }}>
                <h6> <center>SPINDEL-1 SPEED</center></h6>
              </div>
              <div className='col-3 pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>60 &nbsp; %</center></h6>
              </div>
              <div className='col-3  pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>{data["SPINDEL-1 SPEED"]}</center></h6>
              </div>
            </div>
            <div className='row'>
              <div className='col-5 pt-2 border-1 border-info m-1 round' style={{ backgroundColor: "#73BAD7" }}>
                <h6> <center>SERVO 1 TEMP</center></h6>
              </div>
              <div className='col-3 pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>60 &nbsp; %</center></h6>
              </div>
              <div className='col-3  pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>{data["SERVO 1 TEMP"]}</center></h6>
              </div>
            </div>
            <div className='row'>
              <div className='col-5 pt-2 border-1 border-info m-1 round' style={{ backgroundColor: "#73BAD7" }}>
                <h6> <center>SERVO 2 TEMP</center></h6>
              </div>
              <div className='col-3 pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>60 &nbsp; %</center></h6>
              </div>
              <div className='col-3  pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>{data["SERVO 2 TEMP"]}</center></h6>
              </div>
            </div>
            <div className='row'>
              <div className='col-5 pt-2 border-1 border-info m-1 round' style={{ backgroundColor: "#73BAD7" }}>
                <h6> <center>SERVO 3 TEMP</center></h6>
              </div>
              <div className='col-3 pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>60 &nbsp; %</center></h6>
              </div>
              <div className='col-3  pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>{data["SERVO 3 TEMP"]}</center></h6>
              </div>
            </div>
          </div>
          <div className='col vh-100 m-3'>
            <div className='row'>
              <div className='col-5 pt-2 border-1 border-info m-1 round' style={{ backgroundColor: "#73BAD7" }}>
                <h6> <center>SERVO 4 TEMP</center></h6>
              </div>
              <div className='col-3 pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>60 &nbsp; %</center></h6>
              </div>
              <div className='col-3  pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>{data["SERVO 4 TEMP"]}</center></h6>
              </div>
            </div>
            <div className='row'>
              <div className='col-5 pt-2 border-1 border-info m-1 round' style={{ backgroundColor: "#73BAD7" }}>
                <h6> <center>ENCODER 1 TEMP</center></h6>
              </div>
              <div className='col-3 pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>60 &nbsp; %</center></h6>
              </div>
              <div className='col-3  pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>{data["ENCODER 1 TEMP."] !== null ? data["ENCODER 1 TEMP."] : 'N/A'}</center></h6>
              </div>
            </div>
            <div className='row'>
              <div className='col-5 pt-2 border-1 border-info m-1 round' style={{ backgroundColor: "#73BAD7" }}>
                <h6> <center>ENCODER 2 TEMP</center></h6>
              </div>
              <div className='col-3 pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>60 &nbsp; %</center></h6>
              </div>
              <div className='col-3  pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>{data["ENCODER 2 TEMP."] !== null ? data["ENCODER 2 TEMP."] : 'N/A'}</center></h6>
              </div>
            </div>
            <div className='row'>
              <div className='col-5 pt-2 border-1 border-info m-1 round' style={{ backgroundColor: "#73BAD7" }}>
                <h6> <center>ENCODER 3 TEMP.</center></h6>
              </div>
              <div className='col-3 pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>60 &nbsp; %</center></h6>
              </div>
              <div className='col-3  pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>{data["ENCODER 3 TEMP."] !== null ? data["ENCODER 3 TEMP."] : 'N/A'}</center></h6>
              </div>
            </div>
            <div className='row'>
              <div className='col-5 pt-2 border-1 border-info m-1 round' style={{ backgroundColor: "#73BAD7" }}>
                <h6> <center>ENCODER 4 TEMP.</center></h6>
              </div>
              <div className='col-3 pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>60 &nbsp; %</center></h6>
              </div>
              <div className='col-3  pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>{data["ENCODER 4 TEMP."] !== null ? data["ENCODER 4 TEMP."] : 'N/A'}</center></h6>
              </div>
            </div>
            <div className='row'>
              <div className='col-5 pt-2 border-1 border-info m-1 round' style={{ backgroundColor: "#73BAD7" }}>
                <h6> <center>BATTERY 1 STATUS</center></h6>
              </div>
              <div className='col-3 pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>60 &nbsp; %</center></h6>
              </div>
              <div className='col-3  pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>{data["BATTERY 1 STATUS"]}</center></h6>
              </div>
            </div>
            <div className='row'>
              <div className='col-5 pt-2 border-1 border-info m-1 round' style={{ backgroundColor: "#73BAD7" }}>
                <h6> <center>BATTERY 2 STATUS</center></h6>
              </div>
              <div className='col-3 pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>60 &nbsp; %</center></h6>
              </div>
              <div className='col-3  pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>{data["BATTERY 2 STATUS"]}</center></h6>
              </div>
            </div>
            <div className='row'>
              <div className='col-5 pt-2 border-1 border-info m-1 round' style={{ backgroundColor: "#73BAD7" }}>
                <h6> <center>BATTERY 3 STATUS</center></h6>
              </div>
              <div className='col-3 pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>60 &nbsp; %</center></h6>
              </div>
              <div className='col-3  pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>{data["BATTERY 3 STATUS"]}</center></h6>
              </div>
            </div>
            <div className='row'>
              <div className='col-5 pt-2 border-1 border-info m-1 round' style={{ backgroundColor: "#73BAD7" }}>
                <h6> <center>BATTERY 4 STATUS</center></h6>
              </div>
              <div className='col-3 pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>60 &nbsp; %</center></h6>
              </div>
              <div className='col-3  pt-2 border m-1' style={{ backgroundColor: "#3CB03E" }}>
                <h6><center>{data["BATTERY 4 STATUS"]}</center></h6>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No data available</p>
      )}
      


    </div>
  )
}

export default FanucCncM1