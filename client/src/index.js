import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
//import NoPage from "./NoPage";
import SignInSide from "./SignInSide";
import Signup from "./Signup.js";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import ChangeUsername from "./ChangeUsername";
import DeleteAccount from "./DeleteAccount";
import UserSettings from "./UserSettings";
import StandFix from "./StandFix";
import RefereeData from "./RefereeData";

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
          <Route path="StandFix" element={<StandFix/>} />
          <Route path="refereedata" element={<RefereeData/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
