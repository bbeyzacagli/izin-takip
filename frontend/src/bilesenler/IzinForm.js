import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IzinForm = () => {
    const [calisanlar, setCalisanlar] = useState([]);
    const [selectedCalisan, setSelectedCalisan] = useState('');
    const [izinGunleri, setIzinGunleri] = useState('');

    useEffect(() => {
        const fetchCalisanlar = async () => {
            try {
                const response = await axios.get('http://localhost:8080/calisanlar');
                setCalisanlar(response.data);
            } catch (error) {
                console.error('Çalışanlar alınırken hata oluştu:', error);
            }
        };
        fetchCalisanlar();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const calisan_id = selectedCalisan.split(' ')[0];
            const izinResponse = await axios.post('http://localhost:8080/izinler', {
                alinan_izin: parseInt(izinGunleri),
                calisan: { calisan_id: calisan_id }
            });

            if (izinResponse.status === 201) {
                const calisanResponse = await axios.patch(`http://localhost:8080/calisanlar/${calisan_id}`, {
                    toplamIzinGun: izinResponse.data.calisan.toplamIzinGun
                });

                if (calisanResponse.status === 200) {
                    alert('İzin kaydı başarıyla güncellendi.');
                    setSelectedCalisan('');
                    setIzinGunleri('');
                } else {
                    throw new Error('Çalışan izin günleri güncellenirken hata oluştu.');
                }
            } else {
                throw new Error('İzin kaydı oluşturulurken hata oluştu.');
            }
        } catch (error) {
            console.error('Hata:', error);
            alert('Bir hata oluştu: ' + error.message);
        }
    };

    return (
        <div className="container">
            <h1>İzin Giriş Ekranı</h1>
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
                            {calisan.ad} {calisan.soyad}
                        </option>
                    ))}
                </select>

                <label htmlFor="izinGunleri">İzin Günleri:</label>
                <input
                    type="number"
                    id="izinGunleri"
                    name="izinGunleri"
                    value={izinGunleri}
                    onChange={(e) => setIzinGunleri(e.target.value)}
                    required
                />

                <button type="submit">Kaydet</button>
            </form>
        </div>
    );
};

export default IzinForm;
