import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import NoPage from "./NoPage";
import SignInSide from "./SignInSide";
import Signup from "./Signup.js";
import UserSettings from "./UserSettings.js";
import ChangeUsername from "./ChangeUsername.js";
import ChangeEmail from "./ChangeEmail.js";
import ChangePassword from "./ChangePassword.js";
import DeleteAccount from "./DeleteAccount.js";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SignInSide />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<NoPage />} />
          <Route path="usersettings" element={<UserSettings />} />
          <Route path="changeusername" element={<ChangeUsername/>} />
          <Route path="changeemail" element={<ChangeEmail/>} />
          <Route path="changepassword" element={<ChangePassword/>} />
          <Route path="deleteaccount" element={<DeleteAccount/>} />
          <Route path="signinside" element={<SignInSide/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
