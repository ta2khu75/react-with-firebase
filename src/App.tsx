import { useEffect, useState } from 'react';
import './App.css';
import { Link, Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from 'react-router-dom';
import HomeComponent from './component/HomeComponent';
import AppComponent from './component/AppComponent';
import RegisterComponent from './component/RegisterComponent';
import LoginComponent from './component/LoginComponent';
import TodoComponent from './component/TodoComponent';
import PrivateRouter from './component/PrivateRouter';
function App() {
  return (
    <Router>
      <AppComponent />
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/home" element={<HomeComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/todo" element={<PrivateRouter><TodoComponent /></PrivateRouter>} />
      </Routes>
    </Router>
  );
}
export default App;
