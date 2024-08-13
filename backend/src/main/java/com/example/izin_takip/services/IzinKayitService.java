package com.example.izin_takip.services;

import com.example.izin_takip.models.Calisan;
import com.example.izin_takip.models.IzinKayit;
import com.example.izin_takip.repositories.IzinKayitRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class IzinKayitService {
    @Autowired
    private IzinKayitRepository izinKayitRepository;

    @Autowired
    private CalisanService calisanService;

    public List<IzinKayit> findAll() {
        return izinKayitRepository.findAll();
    }

    public Optional<IzinKayit> findById(Long id) {
        return izinKayitRepository.findById(id);
    }

    public IzinKayit save(IzinKayit izinKayit) {
        IzinKayit savedIzinKayit = izinKayitRepository.save(izinKayit);

        Optional<Calisan> calisanOpt = calisanService.getCalisanById(izinKayit.getCalisan().getCalisan_id());
        if (calisanOpt.isPresent()) {
            Calisan calisan = calisanOpt.get();
            calisan.setToplamIzinGun(calisan.getToplamIzinGun() - izinKayit.getAlinan_izin());
            calisanService.updateCalisan(calisan);
        } else {
            throw new RuntimeException("Çalışan bulunamadı");
        }

        return savedIzinKayit;
    }

    public void deleteById(Long id) {
        izinKayitRepository.deleteById(id);
    }
}
