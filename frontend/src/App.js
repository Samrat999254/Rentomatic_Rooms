import { Route, Routes, BrowserRouter } from "react-router-dom";
import { NotificationsProvider } from "@mantine/notifications";

import "./App.css";
import NavBar from "./NavBar/NavBar";
import Hero from "./hero/Hero";
import Registration from "./Registration/Registration";
import Footer from "./footer/footer";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import Forget from "./Forget/Forget";
import CreateOwnerAccount from "./createOwnerAccount/CreateOwnerAccount";
import CreateTenantAccount from "./createTenantAccount/CreateTenantAccount";
import FindRoom from "./findroom/FindRoom";
import FindTenant from "./findtenant/findTenant";
import Listing from "./listing/Listing";
import TenantProfile from "./listing/TenantProfile";
// import { useState } from "react";
import ResetPassword from "./ResetPassword/ResetPassword";
import Faq from "./Faq/Faq";
import Admin from "./Admin/Admin";
import Dashboard from "./Admin/Dashboard/Dashboard";
import Rooms from "./Admin/Rooms/Rooms";
import Tenant from "./Admin/Tenant/Tenant";
import Privacy from "./privacy/Privacy";
import Private from "./PrivateRoute/Private";
import AdminRoute from "./AdminRoute/AdminRoute";

//new
function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <NotificationsProvider>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forget" element={<Forget />} />
            <Route
              path="/createOwnerAccount"
              element={<CreateOwnerAccount />}
            />
            <Route
              path="/createTenantAccount"
              element={<CreateTenantAccount />}
            />
            <Route path="/findRoom" element={<FindRoom />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/findTenant" element={<FindTenant />} />
            <Route path="/room/:id" element={<Listing />} />
            <Route path="/tenantprofile/:id" element={<TenantProfile />} />
            {/* api/v1/users/reset-password */}
            <Route
              path="/api/v1/users/reset-password/:token"
              element={<ResetPassword />}
            />

            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route
              path="/profile"
              element={
                <Private>
                  <Profile />
                </Private>
              }
            />

            <Route path="/faq" element={<Faq />} />
            <Route path="/privacy" element={<Privacy />} />

            {/* <Admin> */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="rooms" element={<Rooms />} />
              <Route path="tenant" element={<Tenant />} />
            </Route>
          </Routes>
        </NotificationsProvider>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
