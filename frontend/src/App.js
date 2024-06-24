import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRegister from "./screens/LoginRegister/LoginRegister";
import MyJournal from "./screens/MyJournal/MyJournal";
import NewEntry from "./screens/NewEntry/NewEntry";
import { useSelector } from "react-redux";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import GroupPage from "./screens/GroupPage/GroupPage";
import AddGroup from "./screens/AddGroup/AddGroup";
import UserProfile from "./screens/UserProfile/UserProfile";

// app
function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // browser router
  return (
    <BrowserRouter>
      {userInfo && <Header />}
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/myjournal" element={<MyJournal />} />
        <Route path="/newentry" element={<NewEntry />} />
        <Route path="/mygroups/:id" element={<GroupPage />} />
        <Route path="/addgroup" element={<AddGroup />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
