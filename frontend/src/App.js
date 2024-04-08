import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRegister from './screens/LoginRegister/LoginRegister';
import MyJournal from './screens/MyJournal/MyJournal';
import { useSelector } from "react-redux";
import Header from "./components/Header/Header";

function App() {

  const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

  return (
    <BrowserRouter>
      { userInfo ? <Header /> : null}
      <Routes>
        <Route path="/" Component={LoginRegister}/>
        <Route path="/myjournal" Component={MyJournal} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
