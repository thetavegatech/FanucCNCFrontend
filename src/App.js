import FanucCncM1 from "./Components/FanucCncM1";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import FanucCncM1OEE  from "./Components/FanucCncM1OEE";
import BreakSummery from "./Components/BreakSummery";
import EditBreakdown from "./Components/EditBreakdown";
import DummyOee from "./Components/DummyOee";
// import DesignTesting from "./Components/DesignTesting";


function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<FanucCncM1 />} />
      <Route path="/fanuccncoee" element={<FanucCncM1OEE />} />
      <Route path="/breakdownsummary" element={<BreakSummery />} />
      <Route path="/EditBreakdown/:id" element={<EditBreakdown />} />
      <Route path="/DummyOee" element={<DummyOee />} />
      {/* <Route path="/designtesting" element={<DesignTesting />} /> */}
    </Routes>
    </BrowserRouter>

  );
}

export default App;
