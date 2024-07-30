import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CalisanForm from './bilesenler/CalisanForm';
import IzinForm from './bilesenler/IzinForm';
import Liste from './bilesenler/Liste';
import './css/stil.css';

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Veri Giriş Ekranı</Link>
                        </li>
                        <li>
                            <Link to="/izin">İzin Giriş Ekranı</Link>
                        </li>
                        <li>
                            <Link to="/liste">Listeleme Ekranı</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<CalisanForm />} />
                    <Route path="/izin" element={<IzinForm />} />
                    <Route path="/liste" element={<Liste />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
