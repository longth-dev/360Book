import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import EventCountDown from "./Pages/EventCountDown/EventCountDown";
import CountDownExamDay from "./Pages/CountDownExamDay/CountDownExamDay";
import CountDownRegisterForAdmission from "./Pages/CountDownRegisterForAdmission/CountDownRegisterForAdmission";
import PublishScoreDay from "./Pages/PublishScoreDay/PublishScoreDay";
import CountDownPublishRealScore from "./Pages/CountDownPublishRealScore/CountDownPublishRealScore";
import AdmissionScore from "./Pages/AdmissionScore/AdmissionScore";
import ScoreCalculator from "./Pages/ScoreCalculator/ScoreCalculator";
import UniCompare from "./Pages/UniversityComparison/UniCompare";
import LayoutAdmin from "./Pages/Layout/LayoutAdmin";
import AddScore from "./Pages/Admin/AddScore/AddScore";
import UpdateScore from "./Pages/Admin/UpdateScore/UpdateScore";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dem-nguoc" element={<EventCountDown />} />
        <Route
          path="/dem-nguoc/ngay-thi-tot-nghiep"
          element={<CountDownExamDay />}
        />
        <Route
          path="/dem-nguoc/ngay-dang-ki-nguyen-vong"
          element={<CountDownRegisterForAdmission />}
        />
        <Route
          path="/dem-nguoc/cong-bo-diem-thi"
          element={<PublishScoreDay />}
        />
        <Route
          path="/dem-nguoc/diem-chuan-dot-1"
          element={<CountDownPublishRealScore />}
        />
        <Route path="/diem-chuan" element={<AdmissionScore />} />
        <Route path="/tinh-diem" element={<ScoreCalculator />} />
        <Route path="/so-sanh" element={<UniCompare />} />
        {/* Add more routes as needed */}
        /* Admin routes wrapped in LayoutAdmin */
        <Route path="/admin" element={<LayoutAdmin />}>
          {/* <Route path="/admin/manage-dai-hoc" element={<ManageUniversity />} />
          <Route path="/admin/manage-nganh-hoc" element={<ManageMajor />} />
          <Route
            path="/admin/manage-thoi-gian-thi"
            element={<ManageSchedual />}
          /> */}
          <Route path="/admin/diem-chuan/add" element={<AddScore />} />
          <Route
            path="/admin/diem-chuan/update"
            element={<UpdateScore />}
          />
          <Route path="/admin/" />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
