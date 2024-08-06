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
      <div className="table-wrapper">
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
          <tbody>
            {calisanlar.map((calisan, index) => (
              <tr key={index}>
                <td>{calisan.ad}</td>
                <td>{calisan.soyad}</td>
                <td>{calisan.email}</td>
                <td>{calisan.departman}</td>
                <td>{calisan.toplamIzinGun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Liste;