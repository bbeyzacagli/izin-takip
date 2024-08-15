import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import CalisanForm from './bilesenler/CalisanForm';
import IzinForm from './bilesenler/IzinForm';
import Liste from './bilesenler/Liste';
import './css/stil.css';

const App = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <Router>
            <nav>
                <div className="navbar-container">
                    <span className="site-name">İzin Takip Uygulaması</span>
                    <div className="menu-toggle" onClick={toggleMenu}>
                        &#9776; {}
                    </div>
                    <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                        <li>
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => isActive ? 'active' : ''}
                                onClick={() => setMenuOpen(false)} 
                            >
                                Yeni Çalışan
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/izin" 
                                className={({ isActive }) => isActive ? 'active' : ''}
                                onClick={() => setMenuOpen(false)}
                            >
                                İzin Kaydı
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/liste" 
                                className={({ isActive }) => isActive ? 'active' : ''}
                                onClick={() => setMenuOpen(false)}
                            >
                                Listeleme
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
