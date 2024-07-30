package com.example.izin_takip.controllers;

import com.example.izin_takip.models.Calisan;
import com.example.izin_takip.service.CalisanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/calisanlar")
public class CalisanController {
    @Autowired
    private CalisanService calisanService;

    @GetMapping
    public ResponseEntity<List<Calisan>> getAllCalisan() {
        List<Calisan> calisanlar = calisanService.getAllCalisan();
        return ResponseEntity.ok(calisanlar);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Calisan> getCalisanById(@PathVariable Long id) {
        Optional<Calisan> calisanOpt = calisanService.getCalisanById(id);
        return calisanOpt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<Calisan> addCalisan(@RequestBody Calisan calisan) {
        Calisan savedCalisan = calisanService.saveCalisan(calisan);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCalisan);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Calisan> updateCalisan(@PathVariable Long id, @RequestBody Calisan calisan) {
        if (!calisanService.getCalisanById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        calisan.setCalisan_id(id);
        Calisan updatedCalisan = calisanService.saveCalisan(calisan);
        return ResponseEntity.ok(updatedCalisan);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Calisan> updateCalisanPartial(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        Optional<Calisan> calisanOpt = calisanService.getCalisanById(id);
        if (!calisanOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Calisan calisan = calisanOpt.get();
        updates.forEach((key, value) -> {
            switch (key) {
                case "ad":
                    calisan.setAd((String) value);
                    break;
                case "soyad":
                    calisan.setSoyad((String) value);
                    break;
                case "email":
                    calisan.setEmail((String) value);
                    break;
                case "departman":
                    calisan.setDepartman((String) value);
                    break;
                case "toplamIzinGun":
                    calisan.setToplamIzinGun((Integer) value);
                    break;
            }
        });
        Calisan updatedCalisan = calisanService.updateCalisan(calisan);
        return ResponseEntity.ok(updatedCalisan);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCalisan(@PathVariable Long id) {
        if (calisanService.getCalisanById(id).isPresent()) {
            calisanService.deleteCalisan(id);
            return ResponseEntity.noContent().build();
        }
        calisanService.deleteCalisan(id);
        return ResponseEntity.noContent().build();
    }
}
