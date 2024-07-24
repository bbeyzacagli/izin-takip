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
    public ResponseEntity<List<Calisan>> getAllCalisanlar() {
        List<Calisan> calisanlar = calisanService.getAllCalisanlar();
        return ResponseEntity.ok(calisanlar);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Calisan> getCalisanById(@PathVariable Long id) {
        Optional<Calisan> calisan = calisanService.getCalisanById(id);
        if (calisan.isPresent()) {
            return ResponseEntity.ok(calisan.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Calisan> addCalisan(@RequestBody Calisan calisan) {
        Calisan savedCalisan = calisanService.saveCalisan(calisan);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedCalisan);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Calisan> updateCalisan(@PathVariable Long id, @RequestBody Calisan calisan) {
        Optional<Calisan> existingCalisan = calisanService.getCalisanById(id);

        if (existingCalisan.isPresent()) {
            calisan.setCalisan_id(id);
            Calisan updatedCalisan = calisanService.saveCalisan(calisan);
            return ResponseEntity.ok(updatedCalisan);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Calisan> partialUpdateCalisan(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        Optional<Calisan> existingCalisan = calisanService.getCalisanById(id);

        if (existingCalisan.isPresent()) {
            Calisan calisan = existingCalisan.get();

            if (updates.containsKey("ad")) {
                calisan.setAd((String) updates.get("ad"));
            }
            if (updates.containsKey("soyad")) {
                calisan.setSoyad((String) updates.get("soyad"));
            }
            if (updates.containsKey("email")) {
                calisan.setEmail((String) updates.get("email"));
            }
            if (updates.containsKey("departman")) {
                calisan.setDepartman((String) updates.get("departman"));
            }
            if (updates.containsKey("tel_no")) {
                calisan.setTel_no((String) updates.get("tel_no"));
            }
            if (updates.containsKey("tc_no")) {
                calisan.setTc_no((String) updates.get("tc_no"));
            }
            if (updates.containsKey("izin_gun")) {
                calisan.setIzin_gun((Integer) updates.get("izin_gun"));
            }

            Calisan updatedCalisan = calisanService.saveCalisan(calisan);
            return ResponseEntity.ok(updatedCalisan);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCalisan(@PathVariable Long id) {
        if (calisanService.getCalisanById(id).isPresent()) {
            calisanService.deleteCalisan(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
