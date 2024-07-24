package com.example.izin_takip.controllers;

import com.example.izin_takip.models.Calisan;
import com.example.izin_takip.models.IzinKayit;
import com.example.izin_takip.service.CalisanService;
import com.example.izin_takip.service.IzinKayitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/izin-kayitlar")
public class IzinKayitController {

    @Autowired
    private IzinKayitService izinKayitService;

    @Autowired
    private CalisanService calisanService;

    @GetMapping
    public List<IzinKayit> getAllIzinKayitlar() {
        return izinKayitService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<IzinKayit> getIzinKayitById(@PathVariable Long id) {
        Optional<IzinKayit> izinKayit = izinKayitService.findById(id);
        if (izinKayit.isPresent()) {
            return ResponseEntity.ok(izinKayit.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public IzinKayit addIzinKayit(@RequestBody IzinKayit izinKayit) {
        Calisan calisan = izinKayit.getCalisan();
        calisan.setIzin_gun(calisan.getIzin_gun() - izinKayit.getIzin_gun());
        calisanService.saveCalisan(calisan);
        return izinKayitService.save(izinKayit);
    }

    @PutMapping("/{id}")
    public IzinKayit updateIzinKayit(@PathVariable Long id, @RequestBody IzinKayit izinKayit) {
        izinKayit.setIzin_id(id);
        return izinKayitService.save(izinKayit);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<IzinKayit> partialUpdateIzinKayit(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        Optional<IzinKayit> existingIzinKayit = izinKayitService.findById(id);

        if (existingIzinKayit.isPresent()) {
            IzinKayit izinKayit = existingIzinKayit.get();

            if (updates.containsKey("izin_gun")) {
                izinKayit.setIzin_gun((Integer) updates.get("izin_gun"));
            }
            if(updates.containsKey("izin_baslangic")){
                izinKayit.setIzin_baslangic((Date) updates.get("izin_baslangic"));
            }
            if(updates.containsKey("izin_bitis")){
                izinKayit.setIzin_bitis((Date) updates.get("izin_bitis"));
            }
            if (updates.containsKey("calisan_id")) {
                Long calisan_id = ((Number) updates.get("calisan_id")).longValue();
                Optional<Calisan> calisan = calisanService.getCalisanById(calisan_id);
                if (calisan.isPresent()) {
                    izinKayit.setCalisan(calisan.get());
                } else {
                    return ResponseEntity.badRequest().body(null);
                }
            }
            IzinKayit updatedIzinKayit = izinKayitService.save(izinKayit);
            return ResponseEntity.ok(updatedIzinKayit);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public void deleteIzinKayit(@PathVariable Long id) {
        izinKayitService.deleteById(id);
    }
}
