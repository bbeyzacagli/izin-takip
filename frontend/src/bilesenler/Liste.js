import React, { useEffect, useState } from 'react';
import '../css/stil.css';

const Liste = () => {
  const [calisanlar, setCalisanlar] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/calisanlar')
      .then(response => response.json())
      .then(data => setCalisanlar(data))
      .catch(error => {
        console.error('Veri çekme hatası:', error);
      });
  }, []);

  return (
    <div className="container">
      <h1>Çalışanlar Listesi</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Email</th>
            <th>Departman</th>
            <th>İzin Günleri</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default Liste;
