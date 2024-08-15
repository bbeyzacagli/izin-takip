import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/stil.css';

const Liste = () => {
  const [calisanlar, setCalisanlar] = useState([]);

  useEffect(() => {
    const fetchCalisanlar = async () => {
      try {
        const response = await axios.get('http://localhost:8080/calisanlar');
        setCalisanlar(response.data);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };
    fetchCalisanlar();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bu çalışanı silmek istediğinizden emin misiniz?')) {
        try {
            const response = await axios.delete(`http://localhost:8080/calisanlar/${id}`);
            if (response.status === 200) {
                setCalisanlar(calisanlar.filter(calisan => calisan.calisan_id !== id));
                alert('Çalışan başarıyla silindi.');
            } else {
                throw new Error('Silme işlemi başarısız.');
            }
        } catch (error) {
            console.error('Hata:', error);
            alert('Bir hata oluştu: ' + error.message);
        }
    }
  };

  return (
    <div className="container">
      <h1>Çalışan Bilgileri</h1>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Ad</th>
              <th>Soyad</th>
              <th>Departman</th>
              <th>İzin Günleri</th>
              <th>Çalışanı Sil</th>
            </tr>
          </thead>
          <tbody>
            {calisanlar.map((calisan) => (
              <tr key={calisan.calisan_id}>
                <td>{calisan.ad}</td>
                <td>{calisan.soyad}</td>
                <td>{calisan.departman}</td>
                <td>{calisan.toplamIzinGun}</td>
                <td>
                  <button 
                    className="delete-button"
                    onClick={() => handleDelete(calisan.calisan_id)}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Liste;
