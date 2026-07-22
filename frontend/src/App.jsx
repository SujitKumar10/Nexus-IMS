import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Groups from "./pages/Groups";
import Chains from "./pages/Chains";
import Brands from "./pages/Brands";
import Subzones from "./pages/Subzones";
import Estimates from "./pages/Estimates";
import Invoices from "./pages/Invoices";
import Payments from "./pages/Payments";
import Users from "./pages/Users";
import Register from "./pages/Register";
import Reports from "./pages/Reports";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/chains" element={<Chains />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/subzones" element={<Subzones />} />
        <Route path="/estimates" element={<Estimates />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/users" element={<Users />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


