package com.example.izin_takip.service;

import com.example.izin_takip.models.Calisan;
import com.example.izin_takip.models.IzinKayit;
import com.example.izin_takip.repository.CalisanRepository;
import com.example.izin_takip.repository.IzinKayitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IzinKayitService {

    @Autowired
    private IzinKayitRepository izinKayitRepository;

    @Autowired
    private CalisanRepository calisanRepository;

    public List<IzinKayit> findAll() {
        return izinKayitRepository.findAll();
    }

    public Optional<IzinKayit> findById(Long id) {
        return izinKayitRepository.findById(id);
    }

    public IzinKayit save(IzinKayit izinKayit) {
        // İzin süresi kadar toplam izin gününden düşülmesi
        Optional<Calisan> calisanOpt = calisanRepository.findById(izinKayit.getCalisan().getCalisan_id());
        if (calisanOpt.isPresent()) {
            Calisan calisan = calisanOpt.get();
            int kalanIzinGun = calisan.getIzin_gun() - izinKayit.getIzin_gun();
            if (kalanIzinGun < 0) {
                throw new IllegalArgumentException("Yeterli izin günü yok.");
            }
            calisan.setIzin_gun(kalanIzinGun);
            calisanRepository.save(calisan);
        }
        return izinKayitRepository.save(izinKayit);
    }

    public void deleteById(Long id) {
        izinKayitRepository.deleteById(id);
    }
}
