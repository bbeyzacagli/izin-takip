import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import '../css/stil.css';

const IzinForm = () => {
    const [calisanlar, setCalisanlar] = useState([]);
    const [selectedCalisan, setSelectedCalisan] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [daysOff, setDaysOff] = useState(0);
    const [maxEndDate, setMaxEndDate] = useState(null);
    const [hataMesaji, setHataMesaji] = useState('');

    useEffect(() => {
        const fetchCalisanlar = async () => {
            const response = await axios.get('http://localhost:8080/calisanlar');
            setCalisanlar(response.data);
        };
        fetchCalisanlar();
    }, []);

    const calculateDaysOff = (start, end) => {
        if (start && end) {
            const diffTime = Math.abs(new Date(end) - new Date(start));
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            setDaysOff(diffDays);
        }
    }

    const handleCalisanChange = (e) => {
        const calisanId = e.target.value.split(' ')[0];
        const selectedCalisanObj = calisanlar.find(calisan => calisan.calisan_id === parseInt(calisanId));
        setSelectedCalisan(e.target.value);

        if (selectedCalisanObj) {
            if (startDate) {
                const maxEndDate = new Date(startDate);
                maxEndDate.setDate(maxEndDate.getDate() + selectedCalisanObj.toplamIzinGun - 1);
                setMaxEndDate(maxEndDate);
            }
        }
    }

    const handleStartDateChange = (date) => {
        setStartDate(date);

        if (selectedCalisan) {
            const calisanId = selectedCalisan.split(' ')[0];
            const selectedCalisanObj = calisanlar.find(calisan => calisan.calisan_id === parseInt(calisanId));

            if (selectedCalisanObj) {
                const maxEndDate = new Date(date);
                maxEndDate.setDate(maxEndDate.getDate() + selectedCalisanObj.toplamIzinGun - 1);
                setMaxEndDate(maxEndDate);
            }
        }

        calculateDaysOff(date, endDate);
    }

    const handleEndDateChange = (date) => {
        setEndDate(date);
        calculateDaysOff(startDate, date);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const calisanId = selectedCalisan.split(' ')[0];
            const selectedCalisanObj = calisanlar.find(calisan => calisan.calisan_id === parseInt(calisanId));

            if (!selectedCalisanObj) {
                setHataMesaji('Çalışan bulunamadı.');
                return;
            }

            if (daysOff > selectedCalisanObj.toplamIzinGun) {
                setHataMesaji('Seçilen gün sayısı çalışanın mevcut izin gününden fazla olamaz.');
                return;
            }

            const response = await axios.post('http://localhost:8080/izinler', {
                alinan_izin: daysOff,
                calisan: {
                    calisan_id: calisanId
                }
            });

            if (response.status === 201) {
                alert('İzin kaydı başarıyla oluşturuldu.');
                setSelectedCalisan('');
                setStartDate(null);
                setEndDate(null);
                setDaysOff(0);
                setHataMesaji('');
                window.location.reload();
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
            <h1>İzin Kayıt Ekranı</h1>
            {hataMesaji && <div className="alert alert-error">{hataMesaji}</div>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="calisan">Çalışan:</label>
                <select
                    id="calisan"
                    name="calisan"
                    value={selectedCalisan}
                    onChange={handleCalisanChange}
                    required
                >
                    <option value="">Seçiniz</option>
                    {calisanlar.map((calisan) => (
                        <option key={calisan.calisan_id} value={`${calisan.calisan_id} ${calisan.ad} ${calisan.soyad}`}>
                             {calisan.ad} {calisan.soyad} ({calisan.departman})
                        </option>
                    ))}
                </select>

                <div>
                    <label>İzin Başlangıç Tarihi:</label>
                    <DatePicker
                        selected={startDate}
                        onChange={handleStartDateChange}
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                        disabled={!selectedCalisan}
                    />
                    
                    <label>İzin Bitiş Tarihi:</label>
                    <DatePicker
                        selected={endDate}
                        onChange={handleEndDateChange}
                        dateFormat="dd/MM/yyyy"
                        minDate={startDate || new Date()}
                        maxDate={maxEndDate}
                        disabled={!startDate}
                    />

                    <div>Alınan İzin Gün Sayısı: {daysOff}</div>
                </div>

                <button type="submit" disabled={!selectedCalisan || !startDate || !endDate}>Kaydet</button>
            </form>
        </div>
    );
};

export default IzinForm;
