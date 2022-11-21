import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import TeamLogin from "./TeamLogin";
import TeamPanel from "./TeamPanel";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<TeamLogin />} />
          <Route path="teamlogin" element={<TeamLogin />} />
          <Route path="teampanel" element={<TeamPanel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));