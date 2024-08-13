package com.example.izin_takip.services;

import com.example.izin_takip.models.Calisan;
import com.example.izin_takip.repositories.CalisanRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CalisanService {
    @Autowired
    private CalisanRepository calisanRepository;

    public Calisan saveCalisan(Calisan calisan) {
        return calisanRepository.save(calisan);
    }

    public List<Calisan> getAllCalisan() {
        return calisanRepository.findAll();
    }

    public Optional<Calisan> getCalisanById(Long id) {
        return calisanRepository.findById(id);
    }

    public Calisan updateCalisan(Calisan calisan) {
        return calisanRepository.save(calisan);
    }

    public boolean deleteCalisanById(Long id) {
        if (calisanRepository.existsById(id)) {
            calisanRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
