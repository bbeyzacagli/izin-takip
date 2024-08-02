import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/stil.css';

const IzinForm = () => {
    const [calisanlar, setCalisanlar] = useState([]);
    const [selectedCalisan, setSelectedCalisan] = useState('');
    const [alinanIzin, setAlinanIzin] = useState('');
    const [hataMesaji, setHataMesaji] = useState('');

    useEffect(() => {
        const fetchCalisanlar = async () => {
            const response = await axios.get('http://localhost:8080/calisanlar');
            setCalisanlar(response.data);
        };
        fetchCalisanlar();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const calisanId = selectedCalisan.split(' ')[0];
            const selectedCalisanObj = calisanlar.find(calisan => calisan.calisan_id === parseInt(calisanId));

            if (!selectedCalisanObj) {
                setHataMesaji('Çalışan bulunamadı.');
                return;
            }

            if (parseInt(alinanIzin) > selectedCalisanObj.toplamIzinGun) {
                setHataMesaji('Alınan izin günleri, çalışanın mevcut izin günlerinden fazla olamaz.');
                return;
            }

            const response = await axios.post('http://localhost:8080/izinler', {
                alinan_izin: parseInt(alinanIzin),
                calisan: {
                    calisan_id: calisanId
                }
            });

            if (response.status === 201) {
                alert('İzin kaydı başarıyla oluşturuldu.');
                setSelectedCalisan('');
                setAlinanIzin('');
                setHataMesaji('');
                window.location.reload(); // Sayfayı yeniler
            } else {
                throw new Error('Bir hata oluştu.');
            }
        } catch (error) {
            console.error('Hata:', error);
            alert('Bir hata oluştu: ' + error.message);
        }
    };

    return (
        <div className="container">
            <h1>İzin Giriş Ekranı</h1>
            {hataMesaji && <div className="alert alert-error">{hataMesaji}</div>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="calisan">Çalışan:</label>
                <select
                    id="calisan"
                    name="calisan"
                    value={selectedCalisan}
                    onChange={(e) => setSelectedCalisan(e.target.value)}
                    required
                >
                    <option value="">Seçiniz</option>
                    {calisanlar.map((calisan) => (
                        <option key={calisan.calisan_id} value={`${calisan.calisan_id} ${calisan.ad} ${calisan.soyad}`}>
                            {calisan.ad} {calisan.soyad} (Kalan İzin: {calisan.toplamIzinGun})
                        </option>
                    ))}
                </select>

                <label htmlFor="alinanIzin">Alınan İzin Günleri:</label>
                <input
                    type="number"
                    id="alinanIzin"
                    name="alinanIzin"
                    value={alinanIzin}
                    onChange={(e) => setAlinanIzin(e.target.value)}
                    required
                />

                <button type="submit">Kaydet</button>
            </form>
        </div>
    );
};

export default IzinForm;
