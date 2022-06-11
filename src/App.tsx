import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/Login';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import User from './pages/User';
import ForgotPassword from './pages/ForgotPassword';
import { useUpdateLogin } from './hooks/LoginContext';
import { useEffect } from 'react';

initializeIcons();

function App() {
  const updateLogin = useUpdateLogin(); 

  useEffect(() => {
    updateLogin?.()
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user" element={<User/>} />
          <Route path="/forgot" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
