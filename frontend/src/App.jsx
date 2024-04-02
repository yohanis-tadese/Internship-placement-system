import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";

// Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminDepartment from "./pages/Admin/Department";
import AdminCompany from "./pages/Admin/Company";
import AdminCriteria from "./pages/Admin/Criteria";
import AdminSettings from "./pages/Admin/Settings";

// // Student Pages
// import StudentDashboard from "./pages/Student/Dashboard";
// import StudentProfile from "./pages/Student/Profile";
// import StudentCourses from "./pages/Student/Courses";

// // Company Pages
// import CompanyDashboard from "./pages/Company/Dashboard";
// import CompanyProjects from "./pages/Company/Projects";
// import CompanySettings from "./pages/Company/Settings";

// // Department Pages
// import DepartmentDashboard from "./pages/Department/Dashboard";
// import DepartmentStatistics from "./pages/Department/Statistics";
// import DepartmentSettings from "./pages/Department/Settings";

import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { DarkModeProvider } from "./context/DarkModeContext";
import Unauthorized from "./pages/Unauthorized";
import Home from "./pages/Home";
import FAQ from "./components/Home/FAQ";

function App() {
  return (
    <>
      <DarkModeProvider>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/Frequently-Asked-Questions" element={<FAQ />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/hhh" element={<Unauthorized />} />
            <Route element={<AppLayout />}>
              <Route path="admin">
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="department" element={<AdminDepartment />} />
                <Route path="company" element={<AdminCompany />} />
                <Route path="criteria" element={<AdminCriteria />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* <Route path="student">
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route path="courses" element={<StudentCourses />} />
              </Route> */}

              {/* Company Routes */}
              {/* <Route path="company">
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="dashboard" element={<CompanyDashboard />} />
                <Route path="projects" element={<CompanyProjects />} />
                <Route path="settings" element={<CompanySettings />} />
              </Route> */}

              {/* Department Routes */}
              {/* <Route path="department">
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="dashboard" element={<DepartmentDashboard />} />
                <Route path="statistics" element={<DepartmentStatistics />} />
                <Route path="settings" element={<DepartmentSettings />} />
              </Route> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </DarkModeProvider>
    </>
  );
}

export default App;
