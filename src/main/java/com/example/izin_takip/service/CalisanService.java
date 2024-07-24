package com.example.izin_takip.service;

import com.example.izin_takip.models.Calisan;
import com.example.izin_takip.repository.CalisanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CalisanService {

    @Autowired
    private CalisanRepository calisanRepository;

    public List<Calisan> getAllCalisanlar() {
        return calisanRepository.findAll();
    }

    public Optional<Calisan> getCalisanById(Long id) {
        return calisanRepository.findById(id);
    }

    public Calisan saveCalisan(Calisan calisan) {
        return calisanRepository.save(calisan);
    }

    public void deleteCalisan(Long id) {
        calisanRepository.deleteById(id);
    }
}
