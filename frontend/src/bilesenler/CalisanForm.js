import React, { useState } from 'react';
import '../css/stil.css';

const CalisanFormu = () => {
    const [formData, setFormData] = useState({
        ad: '',
        soyad: '',
        email: '',
        departman: '',
        izinGunleri: 15
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/calisanlar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log(response);

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                alert('Çalışan bilgileri başarıyla kaydedildi.');
                setFormData({
                    ad: '',
                    soyad: '',
                    email: '',
                    departman: '',
                    izinGunleri: 15
                });
            } else {
                throw new Error(result.message || 'Bilinmeyen hata');
            }
        } catch (error) {
            console.error('Hata:', error);
            alert('Bir hata oluştu: ' + error.message);
        }
    };

    return (
        <div className="container">
            <h1>Bilgilerinizi Giriniz</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="ad">Ad:
                <input
                    type="text"
                    id="ad"
                    name="ad"
                    value={formData.ad}
                    onChange={handleChange}
                    required
                /></label>

                <label htmlFor="soyad">Soyad:
                <input
                    type="text"
                    id="soyad"
                    name="soyad"
                    value={formData.soyad}
                    onChange={handleChange}
                    required
                /></label>

                <label htmlFor="email">Email:
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                /></label>

                <label htmlFor="departman">Departman:
                <input
                    type="text"
                    id="departman"
                    name="departman"
                    value={formData.departman}
                    onChange={handleChange}
                    required
                /></label>

                <button type="submit">Kaydet</button>
            </form>
        </div>
    );
};

export default CalisanFormu;
