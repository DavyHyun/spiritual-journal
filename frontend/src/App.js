import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRegister from './screens/LoginRegister/LoginRegister';
import MyJournal from './screens/MyJournal/MyJournal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={LoginRegister}/>
        <Route path="/myjournal" Component={MyJournal} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
