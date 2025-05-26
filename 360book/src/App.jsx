import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import EventCountDown from "./Pages/EventCountDown/EventCountDown";
import CountDownExamDay from "./Pages/CountDownExamDay/CountDownExamDay";
import CountDownRegisterForAdmission from "./Pages/CountDownRegisterForAdmission/CountDownRegisterForAdmission";
import PublishScoreDay from "./Pages/PublishScoreDay/PublishScoreDay";
import CountDownPublishRealScore from "./Pages/CountDownPublishRealScore/CountDownPublishRealScore";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dem-nguoc" element={<EventCountDown />} />
        <Route path="/dem-nguoc/ngay-thi-tot-nghiep" element={<CountDownExamDay />} />
        <Route path="/dem-nguoc/ngay-dang-ki-nguyen-vong" element={<CountDownRegisterForAdmission />} />
        <Route path="/dem-nguoc/cong-bo-diem-thi" element={<PublishScoreDay />} />
        <Route path="/dem-nguoc/diem-chuan-dot-1" element={<CountDownPublishRealScore />} />
      </Routes>
    </Router>
  )
}

export default App
