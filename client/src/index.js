import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import NoPage from "./NoPage";
import SignInSide from "./SignInSide";
import Signup from "./Signup.js";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import ChangeUsername from "./ChangeUsername";
import DeleteAccount from "./DeleteAccount";
import UserSettings from "./UserSettings";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";
import CreateTeamAccount from "./CreateTeamAccount";
import TeamLogin from "./TeamLogin";
import TeamPanel from "./TeamPanel";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SignInSide />} />
          <Route path="signup" element={<Signup />} />
          <Route path="usersettings" element={<UserSettings />} />
          <Route path="changeemail" element={<ChangeEmail />} />
          <Route path="changepassword" element={<ChangePassword />} />
          <Route path="changeusername" element={<ChangeUsername />} />
          <Route path="deleteaccount" element={<DeleteAccount />} />
          <Route path="adminlogin" element={<AdminLogin />} />
          <Route path="adminpanel" element={<AdminPanel />} />
          <Route path="createteamaccount" element={<CreateTeamAccount />} />
          <Route path="teamlogin" element={<TeamLogin />} />
          <Route path="teampanel" element={<TeamPanel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
