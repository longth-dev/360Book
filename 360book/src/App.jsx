import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import EventCountDown from "./Pages/EventCountDown/EventCountDown";
import CountDownExamDay from "./Pages/CountDownExamDay/CountDownExamDay";
import CountDownRegisterForAdmission from "./Pages/CountDownRegisterForAdmission/CountDownRegisterForAdmission";
import PublishScoreDay from "./Pages/PublishScoreDay/PublishScoreDay";
import CountDownPublishRealScore from "./Pages/CountDownPublishRealScore/CountDownPublishRealScore";
import ManageUniversity from "./Pages/ManageUniversity/ManageUniversity";
import ManageMajor from "./Pages/ManageMajor/ManageMajor";
import ManageSchedual from "./Pages/ManageSchedual/ManageSchedual";
import FavoriteUniversity from "./Pages/FavoriteUniversity/FavoriteUniversity";
import ManageMajorDetail from "./Pages/ManageMajor/ManageMajorDetail";
import SubjectCombinationViewer from "./Pages/SubjectCombinationViewer/SubjectCombinationViewer";
import ManageMajorGroup from "./Pages/ManageMajorGroup/ManageMajorGroup";
import ManageNews from "./Pages/ManageNews/ManageNews";
import ListUniversitiesView from "./Pages/ListUniversitiesView";
import AIChatbox from "./Components/AIChatbox/AIChatbox";
import AdmissionScore from "./Pages/AdmissionScore/AdmissionScore";
import ScoreCalculator from "./Pages/ScoreCalculator/ScoreCalculator";
import UniCompare from "./Pages/UniversityComparison/UniCompare";
import LayoutAdmin from "./Pages/Layout/LayoutAdmin";
import ManageQA from "./Pages/ManageQA/ManageQA";
import VerifyInfo from "./Pages/VerifyInfo/VerifyInfo";
import ManageScore from "./Pages/ManageScore/ManageScore";
import UserQA from "./Pages/UserQA/UserQA";
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
        <Route path="/tra-cuu-to-hop-mon" element={<SubjectCombinationViewer />} />
        <Route path="/ai-chatbox" element={<AIChatbox />} />
        <Route path="/danh-sach-truong" element={<ListUniversitiesView />} />
        <Route path="/hoi-va-dap" element={<UserQA />} />

        {/** MANAGE ADMIN */}
        <Route path='/admin' element={<LayoutAdmin />}>
          <Route path="/admin/manage-dai-hoc" element={<ManageUniversity />} />
          <Route path="/admin/manage-nganh-hoc" element={<ManageMajor />} />
          <Route path="/admin/manage-nganh-hoc/:id" element={<ManageMajorDetail />} />
          <Route path="/admin/manage-thoi-gian-thi" element={<ManageSchedual />} />
          <Route path="/admin/manage-to-hop-mon" element={<ManageMajorGroup />} />
          <Route path="/admin/manage-tin-tuc" element={<ManageNews />} />
          <Route path="/admin/diem-chuan" element={<ManageScore />} />
          <Route path="hoi-xoay-dap-xoay" element={<ManageQA />} />
        </Route>


        {/** USER PAGE */}
        <Route path="/nguoi-dung/truong-yeu-thich" element={<FavoriteUniversity />} />


        <Route path="/diem-chuan" element={<AdmissionScore />} />
        <Route path="/tinh-diem" element={<ScoreCalculator />} />
        <Route path="/so-sanh" element={<UniCompare />} />
        {/* Add more routes as needed */}
        /* Admin routes wrapped in LayoutAdmin */
      

        <Route path="/staff" element={<VerifyInfo/>}/>
      </Routes>
    </Router>
  );
}

export default App;
