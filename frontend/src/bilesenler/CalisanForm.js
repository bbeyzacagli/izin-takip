import React, { useState } from 'react';
import '../css/stil.css';

const CalisanFormu = () => {
    const [formData, setFormData] = useState({
        ad: '',
        soyad: '',
        email: '',
        departman: '',
        telefon: '',
        tcNo: '',
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
                    tel_no: '',
                    tc_no: '',
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
                <label htmlFor="ad">Ad:</label>
                <input
                    type="text"
                    id="ad"
                    name="ad"
                    value={formData.ad}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="soyad">Soyad:</label>
                <input
                    type="text"
                    id="soyad"
                    name="soyad"
                    value={formData.soyad}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="departman">Departman:</label>
                <input
                    type="text"
                    id="departman"
                    name="departman"
                    value={formData.departman}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="telefon">Telefon No:</label>
                <input
                    type="tel"
                    id="tel_no"
                    name="tel_no"
                    value={formData.tel_no}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="tc_no">TC Kimlik No:</label>
                <input
                    type="text"
                    id="tc_no"
                    name="tc_no"
                    value={formData.tc_no}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="izinGunleri">İzin Günleri:</label>
                <input
                    type="number"
                    id="izinGunleri"
                    name="izinGunleri"
                    value={formData.izinGunleri}
                    readOnly
                />

                <button type="submit">Kaydet</button>
            </form>
        </div>
    );
};

export default CalisanFormu;
