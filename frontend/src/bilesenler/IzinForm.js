import React, { useState, useEffect } from 'react';

const IzinForm = () => {
    const [calisanlar, setCalisanlar] = useState([]);
    const [selectedCalisan, setSelectedCalisan] = useState('');
    const [izinGunleri, setIzinGunleri] = useState('');
    const [calisanIdMap, setCalisanIdMap] = useState({});

    useEffect(() => {
        const fetchCalisanlar = async () => {
            try {
                const response = await fetch('http://localhost:8080/calisanlar');
                const data = await response.json();
                setCalisanlar(data);

                const idMap = data.reduce((map, calisan) => {
                    map[`${calisan.ad} ${calisan.soyad}`] = calisan.calisan_id;
                    return map;
                }, {});
                
                setCalisanIdMap(idMap);

            } catch (error) {
                console.error('Hata:', error);
            }
        };

        fetchCalisanlar();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const calisanId = calisanIdMap[selectedCalisan];
        if (!calisanId) {
            alert('Geçersiz çalışan seçimi.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/calisanlar/${calisanId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ izinGunleri })
            });

            if (response.ok) {
                alert('İzin kaydı başarıyla güncellendi.');
                setSelectedCalisan('');
                setIzinGunleri('');
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
                        <option key={calisan.calisan_id} value={`${calisan.ad} ${calisan.soyad}`}>
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
