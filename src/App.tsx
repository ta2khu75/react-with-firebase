import { useEffect, useState } from 'react';
import './App.css';
import { Link, Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from 'react-router-dom';
import HomeComponent from './component/HomeComponent';
import AboutComponent from './component/AboutComponent';
import ContactComponent from './component/ContactComponent';
import AppComponent from './component/AppComponent';
import FirebaseComponent from './component/FirebaseComponent';
import Login from './component/LoginComponent';
import RegisterComponent from './component/RegisterComponent';
type User = {
  name: string
  role: string
  age: number
  address: string
}

// 7-Tim hiểu firebase google với firestore database, khái niệm document, collection

// 9-Vấn đề CRUD Operation từ React với firebase của google
function App() {
  return (
    <Router>
      <AppComponent />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/firebase" element={<FirebaseComponent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/about" element={<AboutComponent />} />
        <Route path="/contact" element={<ContactComponent />} />
      </Routes>
    </Router>
  );
}
export default App;
