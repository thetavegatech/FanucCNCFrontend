import React from 'react';
import Chart from 'react-apexcharts';
import './DesignTesting.css'; // Custom CSS for styling

const Dashboard = () => {
  // Data and configurations for the charts
  const donutOptions = {
    series: [224, 637 - 224], // Example data
    chart: {
      type: 'donut',
    },
    labels: ['Completed', 'Target'],
    colors: ['#00E396', '#008FFB'],
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Parts',
              formatter: () => '224'
            }
          }
        }
      }
    }
  };

  const barOptions = {
    series: [{
      data: [50, 50, 50, 50, 25] // Example data
    }],
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: ['1 pm', '2 pm', '3 pm', '4 pm', '5 pm'],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    colors: ['#FF4560'],
  };

  return (
    <div className="container-fluid bg-dark text-white p-3">
      <div className="row mb-2">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div>Operator: <span className="badge bg-secondary">No Operator</span></div>
              <div>Current Shift: <span className="badge bg-secondary">Second Shift</span></div>
              <div>Part No: <span className="badge bg-secondary">MM_1_2</span></div>
            </div>
            <div className="text-center">
              <h4>TEST PM2</h4>
              <p>new machine</p>
            </div>
            <div className="text-end">
              <div>In Cycle for 11s</div>
              <div>Fri, 16 Jul 2021</div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card bg-dark text-white p-3">
            <Chart options={donutOptions} series={donutOptions.series} type="donut" height="250" />
            <div className="text-center mt-3">
              <div>OF 637 Shift Target</div>
              <div>0 Rejected</div>
              <button className="btn btn-warning mt-2">Reject Parts</button>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <div>Ideal Cycle Time</div>
              <div>30 sec</div>
            </div>
            <div className="d-flex justify-content-between">
              <div>Last Cycle</div>
              <div>25 sec</div>
            </div>
            <div className="d-flex justify-content-between">
              <div>Avg. Cycle</div>
              <div>23.16 sec</div>
            </div>
          </div>
        </div>
        <div className="col-md-5 mb-3">
          <div className="card bg-dark text-white p-3">
            <h5>Parts</h5>
            <Chart options={barOptions} series={barOptions.series} type="bar" height="250" />
            <div className="mt-3">
              <h5>OEE</h5>
              <div className="progress mb-2">
                <div className="progress-bar bg-success" role="progressbar" style={{ width: '37.31%' }} aria-valuenow="37.31" aria-valuemin="0" aria-valuemax="100">37.31% Availability</div>
              </div>
              <div className="progress mb-2">
                <div className="progress-bar bg-info" role="progressbar" style={{ width: '112.49%' }} aria-valuenow="112.49" aria-valuemin="0" aria-valuemax="100">112.49% Performance</div>
              </div>
              <div className="progress">
                <div className="progress-bar bg-warning" role="progressbar" style={{ width: '100%' }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">100% Quality</div>
              </div>
            </div>
            <h5 className="mt-3">Availability</h5>
            <Chart options={barOptions} series={barOptions.series} type="bar" height="250" />
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-dark text-white p-3">
            <h5>Load History</h5>
            <button className="btn btn-primary btn-sm mb-3">Load History</button>
            <div className="mt-3">
              <div className="d-flex justify-content-between">
                <div>Part Completed</div>
                <div>35.16%</div>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <div>Idle Time</div>
                <div>2:48:44s</div>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <div>In Cycle</div>
                <div>37.31%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
