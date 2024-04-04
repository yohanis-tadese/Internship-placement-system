import { Navigate, Route, Routes } from "react-router-dom";
import PrivateAuthRoute from "./auth/PrivateAuthRoute";

import GlobalStyles from "./styles/GlobalStyles";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { DarkModeProvider } from "./context/DarkModeContext";
import Unauthorized from "./pages/Unauthorized";
import Home from "./pages/Home";
import FAQ from "./components/Home/FAQ";

// Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminDepartment from "./pages/Admin/Department";
import AdminCompany from "./pages/Admin/Company";
import AdminCriteria from "./pages/Admin/Criteria";
import AdminSettings from "./pages/Admin/Settings";

// Student Pages

import Dashboard from "./pages/student/Dashboard";
import StudentPlacementForm from "./components/student/CriteriaForm";
import ViewCompany from "./components/student/ViewCompany";

// import Profile from "./pages/student/profile";

// // Company Pages
// import CompanyDashboard from "./pages/Company/Dashboard";
// import CompanyProjects from "./pages/Company/Projects";
// import CompanySettings from "./pages/Company/Settings";

// Department Pages
import DepartmentDashboard from "./pages/departments/Dashboard";
import DepAppLayout from "./ui/Department/DepAppLayout";
import DepartmentStudent from "./pages/departments/Student";

function App() {
  return (
    <>
      <DarkModeProvider>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/apply" element={<StudentPlacementForm />} />
          <Route path="/company" element={<ViewCompany />} />

          <Route element={<AppLayout />}>
            <Route path="admin">
              <Route
                index
                element={
                  <PrivateAuthRoute roles={["Admin"]}>
                    <Navigate replace to="dashboard" />
                  </PrivateAuthRoute>
                }
              />
              <Route
                path="dashboard"
                element={
                  <PrivateAuthRoute roles={["Admin"]}>
                    <AdminDashboard />
                  </PrivateAuthRoute>
                }
              />
              <Route
                path="department"
                element={
                  <PrivateAuthRoute roles={["Admin"]}>
                    <AdminDepartment />
                  </PrivateAuthRoute>
                }
              />
              <Route
                path="company"
                element={
                  <PrivateAuthRoute roles={["Admin"]}>
                    <AdminCompany />
                  </PrivateAuthRoute>
                }
              />
              <Route
                path="criteria"
                element={
                  <PrivateAuthRoute roles={["Admin"]}>
                    <AdminCriteria />
                  </PrivateAuthRoute>
                }
              />
              <Route
                path="settings"
                element={
                  <PrivateAuthRoute roles={["Admin"]}>
                    <AdminSettings />
                  </PrivateAuthRoute>
                }
              />
            </Route>
          </Route>

          {/* ************* department routes *********** */}
          <Route element={<DepAppLayout />}>
            <Route path="department">
              <Route
                index
                element={
                  <PrivateAuthRoute roles={["Department"]}>
                    <Navigate replace to="dashboard" />
                  </PrivateAuthRoute>
                }
              />
              <Route
                path="dashboard"
                element={
                  <PrivateAuthRoute roles={["Department"]}>
                    <DepartmentDashboard />
                  </PrivateAuthRoute>
                }
              />
              <Route
                path="student"
                element={
                  <PrivateAuthRoute roles={["Department"]}>
                    <DepartmentStudent />
                  </PrivateAuthRoute>
                }
              />
              {/* <Route
                path="result"
                element={
                  <PrivateAuthRoute roles={["Department"]}>
                    <AdminCompany />
                  </PrivateAuthRoute>
                }
              /> */}
              {/* <Route
                path="criteria"
                element={
                  <PrivateAuthRoute roles={["Department"]}>
                    <AdminCriteria />
                  </PrivateAuthRoute>
                }
              /> */}
              {/* <Route
                path="settings"
                element={
                  <PrivateAuthRoute roles={["Department"]}>
                    <AdminSettings />
                  </PrivateAuthRoute>
                }
              /> */}
            </Route>
          </Route>

          {/* ******* student routes ********* */}
          <Route path="student">
            <Route
              index
              element={
                <PrivateAuthRoute roles={["Student"]}>
                  <Navigate replace to="dashboard" />
                </PrivateAuthRoute>
              }
            />
            <Route
              path="dashboard"
              element={
                <PrivateAuthRoute roles={["Student"]}>
                  <Dashboard />
                </PrivateAuthRoute>
              }
            />
          </Route>
        </Routes>
      </DarkModeProvider>
    </>
  );
}

export default App;
