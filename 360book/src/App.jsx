import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import EventCountDown from "./Pages/EventCountDown/EventCountDown";
import CountDownExamDay from "./Pages/CountDownExamDay/CountDownExamDay";
import CountDownRegisterForAdmission from "./Pages/CountDownRegisterForAdmission/CountDownRegisterForAdmission";
import PublishScoreDay from "./Pages/PublishScoreDay/PublishScoreDay";
import CountDownPublishRealScore from "./Pages/CountDownPublishRealScore/CountDownPublishRealScore";
import AdminSideBar from "./Pages/AdminSideBar/AdminSideBar";
import ManageUniversity from "./Pages/ManageUniversity/ManageUniversity";
import LayoutAdmin from "./Pages/Layout/LayoutAdmin";
import ManageMajor from "./Pages/ManageMajor/ManageMajor";
import ManageSchedual from "./Pages/ManageSchedual/ManageSchedual";
import FavoriteUniversity from "./Pages/FavoriteUniversity/FavoriteUniversity";
import ManageMajorDetail from "./Pages/ManageMajor/ManageMajorDetail";
import SubjectCombinationViewer from "./Pages/SubjectCombinationViewer/SubjectCombinationViewer";
import ManageMajorGroup from "./Pages/ManageMajorGroup/ManageMajorGroup";
import ManageNews from "./Pages/ManageNews/ManageNews";
import UniversityDetailView from "./Pages/UniversityDetailView";
import ListUniversitiesView from "./Pages/ListUniversitiesView";
import AIChatbox from "./Components/AIChatbox/AIChatbox";

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
        <Route path="/tra-cuu-to-hop-mon" element={<SubjectCombinationViewer />} />
        <Route path="/ai-chatbox" element={<AIChatbox />} />
        <Route path="/danh-sach-truong" element={<ListUniversitiesView />} />
        <Route path="/danh-sach-truong/:id" element={<UniversityDetailView />} />



        {/** MANAGE ADMIN */}
        <Route path='/admin' element={<LayoutAdmin />}>
          <Route path="/admin/manage-dai-hoc" element={<ManageUniversity />} />
          <Route path="/admin/manage-nganh-hoc" element={<ManageMajor />} />
          <Route path="/admin/manage-nganh-hoc/:id" element={<ManageMajorDetail />} />
          <Route path="/admin/manage-thoi-gian-thi" element={<ManageSchedual />} />
          <Route path="/admin/manage-to-hop-mon" element={<ManageMajorGroup />} />
          <Route path="/admin/manage-tin-tuc" element={<ManageNews />} />

        </Route>


        {/** USER PAGE */}
        <Route path="/nguoi-dung/truong-yeu-thich" element={<FavoriteUniversity />} />


      </Routes>
    </Router>
  )
}

export default App
