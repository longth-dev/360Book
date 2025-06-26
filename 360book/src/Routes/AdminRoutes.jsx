import { Route } from "react-router-dom";
import LayoutAdmin from "../Pages/Layout/LayoutAdmin";
import AddScore from "../Pages/Admin/AddScore/AddScore";
import ViewScore from "../Pages/Admin/ViewScore/ViewScore";
// import UpdateScore from "../Pages/Admin/UpdateScore/UpdateScore";
import ManageQA from "../Pages/Admin/ManageQA/ManageQA";
const AdminRoutes = () => (
  <Route path="/admin" element={<LayoutAdmin />}>
    <Route path="diem-chuan/add" element={<AddScore />} />
    {/* <Route path="diem-chuan/update" element={<UpdateScore />} /> */}
    <Route path="hoi-xoay-dap-xoay" element={<ManageQA/>} />
    <Route path="diem-chuan/view" element={<ViewScore/>}/>
    {/* Các route khác */}
  </Route>
);

export default AdminRoutes;