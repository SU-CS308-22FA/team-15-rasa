import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Components/Layout";
import Signin from "./Auth/User/Signin";
import Signup from "./Auth/User/Signup.js";
import ChangeEmail from "./AccountSettings/User/ChangeEmail";
import ChangePassword from "./AccountSettings/User/ChangePassword";
import ChangeUsername from "./AccountSettings/User/ChangeUsername";
import DeleteAccount from "./AccountSettings/User/DeleteAccount";
import UserAccountSettings from "./AccountSettings/User/UserAccountSettings";
import HomePage from "./Home/HomePage";
import NoPage from "./Misc/NoPage";
import UserProfile from "./Profile/User/UserProfile";
import StandFix from "./FixtureStanding/StandFix";
import RefereeData from "./Referee/RefereeData";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="accountsettings" element={<UserAccountSettings />} />
          <Route path="changeemail" element={<ChangeEmail />} />
          <Route path="changepassword" element={<ChangePassword />} />
          <Route path="changeusername" element={<ChangeUsername />} />
          <Route path="deleteaccount" element={<DeleteAccount />} />
          <Route path="userprofile" element={<UserProfile />} />
          <Route path="standfix" element={<StandFix/>} />
          <Route path="refereedata" element={<RefereeData/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);