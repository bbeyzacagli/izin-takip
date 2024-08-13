import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from 'react-router-dom';
import CalisanForm from './bilesenler/CalisanForm';
import IzinForm from './bilesenler/IzinForm';
import Liste from './bilesenler/Liste';
import './css/stil.css';

const App = () => {
    return (
        <Router>
            <nav>
                <div className='navbar-container'>
                    <span className='site-name'>İzin Takip Uygulaması</span>
                    <ul className='nav-links'>
                        <li>
                            <NavLink 
                                to="/"
                                className={({ isActive }) => isActive ? 'active' : ''}
                            >
                                Çalışan Ekleme
                            </NavLink>                                
                        </li>
                        <li>
                            <NavLink 
                                to="/izin"
                                className={({ isActive }) => isActive ? 'active' : ''}
                            >
                                İzin Giriş
                            </NavLink>                                
                        </li>
                        <li>
                            <NavLink 
                                to="/liste"
                                className={({ isActive }) => isActive ? 'active' : ''}
                            >
                                Listeleme Ekranı
                            </NavLink>                                
                        </li>                        
                    </ul>
                </div>
            </nav>
            <Routes>
                <Route path="/" element={<CalisanForm />} />
                <Route path="/izin" element={<IzinForm />} />
                <Route path="/liste" element={<Liste />} />
            </Routes>
        </Router>
    );
};

export default App;