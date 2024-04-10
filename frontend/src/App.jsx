import { Navigate, Route, Routes } from "react-router-dom";
import PrivateAuthRoute from "./components/auth/PrivateAuthRoute";
import { ToastContainer, toast } from "react-toastify";

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
import AdminUser from "./pages/Admin/AdminUser";
import CriteriaWeight from "./pages/Admin/CriteriaWeight";
import StudentPlacement from "./components/Admin/Algorithm/Placement";

// Student Pages
import Dashboard from "./pages/student/Dashboard";
import StudentPlacementForm from "./components/student/ApplyForm";
import CompanyList from "./components/student/CompanyList";
import PlacementResults from "./components/student/PlacementResults";

// import Profile from "./pages/student/profile";

// Company Pages
import CompanyDashboard from "./pages/company/Dashboard";
import CompanyStudent from "./pages/company/Students";

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
          {/* ********* Public Routes ******* */}

          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* ****** Admin Routes ******** */}

          <Route element={<AppLayout />}>
            <Route
              path="admin/dashboard"
              element={
                <PrivateAuthRoute roles={["Admin"]}>
                  <AdminDashboard />
                </PrivateAuthRoute>
              }
            />
            <Route
              path="admin/user"
              element={
                <PrivateAuthRoute roles={["Admin"]}>
                  <AdminUser />
                </PrivateAuthRoute>
              }
            />
            <Route
              path="admin/department"
              element={
                <PrivateAuthRoute roles={["Admin"]}>
                  <AdminDepartment />
                </PrivateAuthRoute>
              }
            />
            <Route
              path="admin/company"
              element={
                <PrivateAuthRoute roles={["Admin"]}>
                  <AdminCompany />
                </PrivateAuthRoute>
              }
            />

            <Route
              path="admin/criteria"
              element={
                <PrivateAuthRoute roles={["Admin"]}>
                  <CriteriaWeight />
                </PrivateAuthRoute>
              }
            />
            <Route
              path="admin/placement"
              element={
                <PrivateAuthRoute roles={["Admin"]}>
                  <StudentPlacement />
                </PrivateAuthRoute>
              }
            />
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

          <Route
            path="student/dashboard"
            element={
              <PrivateAuthRoute roles={["Student"]}>
                <Dashboard />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="student/company"
            element={
              <PrivateAuthRoute roles={["Student"]}>
                <CompanyList />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="student/apply"
            element={
              <PrivateAuthRoute roles={["Student"]}>
                <StudentPlacementForm />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="student/result"
            element={
              <PrivateAuthRoute roles={["Student"]}>
                <PlacementResults />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="student/profile"
            element={
              <PrivateAuthRoute roles={["Student"]}>
                <StudentPlacementForm />
              </PrivateAuthRoute>
            }
          />

          {/* ********** Company Routes ************ */}

          <Route
            path="company/dashboard"
            element={
              <PrivateAuthRoute roles={["Company"]}>
                <CompanyDashboard />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="company/student"
            element={
              <PrivateAuthRoute roles={["Student"]}>
                <CompanyStudent />
              </PrivateAuthRoute>
            }
          />
        </Routes>
      </DarkModeProvider>
    </>
  );
}

export default App;
