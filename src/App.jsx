import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Purchase from "./pages/Purchase";
import Factory from "./pages/Factory";
import Directors from "./pages/Directors";
import Project from "./pages/Project";
import Planning from "./pages/Planning";
import Designers from "./pages/Designers";
import Senior from "./pages/Senior";
import Sales from "./pages/Sales";
import SalesTeamTable from "./pages/sales-team-table";
import Teams from "./pages/Teams";
import AddTeam from "./pages/AddTeam";
import AddProject from "./pages/AddProject";
import Clients from "./pages/Clients";
import Registration from "./pages/Registration";
import EmployeeID from "./pages/EmployeeID";
import MailCode from "./pages/MailCode";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Sidebar />
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<Registration />} />
          <Route element={<ProtectedRoutes />}>
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/purchase" element={<Purchase />} />
              <Route path="/factory" element={<Factory />} />
              <Route path="/directors" element={<Directors />} />
              <Route path="/project" element={<Project />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/designers" element={<Designers />} />
              <Route path="/senior" element={<Senior />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/sales-team-table" element={<SalesTeamTable />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/add-team" element={<AddTeam />} />
              <Route path="/add-project" element={<AddProject />} />
              <Route path="/clients" element={<Clients />} />
            </>
          </Route>
          {/* <Route path="/employee-id" element={<EmployeeID />} /> */}
          {/* <Route path="/mail-code" element={<MailCode />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
