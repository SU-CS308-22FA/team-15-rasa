import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";
import CreateTeamAccount from "./CreateTeamAccount";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="adminlogin" element={<AdminLogin />} />
          <Route path="adminpanel" element={<AdminPanel />} />
          <Route path="createteamaccount" element={<CreateTeamAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));