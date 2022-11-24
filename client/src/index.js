import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Signin from "./Auth/User/Signin";
import Signup from "./Auth/User/Signup.js";
import ChangeEmail from "./AccountSettings/ChangeEmail";
import ChangePassword from "./AccountSettings/ChangePassword";
import ChangeUsername from "./AccountSettings/ChangeUsername";
import DeleteAccount from "./AccountSettings/DeleteAccount";
import AccountSettings from "./AccountSettings/AccountSettings";
import HomePage from "./Home/HomePage";
import NoPage from "./Misc/NoPage";
import UserProfile from "./Profile/User/UserProfile";
import MySurvey from "./Misc/Survey";
import SurveyVisuals from "./Misc/SurveyVisuals";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="accountsettings" element={<AccountSettings />} />
          <Route path="changeemail" element={<ChangeEmail />} />
          <Route path="changepassword" element={<ChangePassword />} />
          <Route path="changeusername" element={<ChangeUsername />} />
          <Route path="deleteaccount" element={<DeleteAccount />} />
          <Route path="userprofile" element={<UserProfile />} />
          <Route path="survey" element={<MySurvey />} />
          <Route path="surveyvisuals" element={<SurveyVisuals />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);
