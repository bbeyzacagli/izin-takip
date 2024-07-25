package com.example.izin_takip.controllers;

import com.example.izin_takip.models.Calisan;
import com.example.izin_takip.models.IzinKayit;
import com.example.izin_takip.service.CalisanService;
import com.example.izin_takip.service.IzinKayitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/izinler")
public class IzinKayitController {

    @Autowired
    private IzinKayitService izinKayitService;

    @Autowired
    private CalisanService calisanService;


    @GetMapping
    public ResponseEntity<List<IzinKayit>> getAllIzinKayit() {
        List<IzinKayit> izinKayitlar = izinKayitService.findAll();
        return ResponseEntity.ok(izinKayitlar);
    }

    @GetMapping("/{id}")
    public ResponseEntity<IzinKayit> getIzinKayitById(@PathVariable Long id) {
        Optional<IzinKayit> izinKayitOpt = izinKayitService.findById(id);
        return izinKayitOpt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<IzinKayit> addIzinKayit(@RequestBody IzinKayit izinKayit) {
        Optional<Calisan> calisanOpt = calisanService.getCalisanById(izinKayit.getCalisan().getCalisan_id());

        if (calisanOpt.isPresent()) {
            Calisan calisan = calisanOpt.get();
            izinKayit.setCalisan(calisan);
            IzinKayit savedIzinKayit = izinKayitService.save(izinKayit);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedIzinKayit);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @PutMapping("/{id}")
    public IzinKayit updateIzinKayit(@PathVariable Long id, @RequestBody IzinKayit izinKayit) {
        izinKayit.setIzin_id(id);
        return izinKayitService.save(izinKayit);
    }
    @PatchMapping("/{id}")
    public ResponseEntity<IzinKayit> updateIzinKayitPartial(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        Optional<IzinKayit> izinKayitOpt = izinKayitService.findById(id);
        if (!izinKayitOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        IzinKayit izinKayit = izinKayitOpt.get();
        Integer eskiAlinanIzin = izinKayit.getAlinan_izin();

        updates.forEach((key, value) -> {
            if ("alinanIzin".equals(key)) {
                izinKayit.setAlinan_izin((Integer) value);
            }
        });

        // Çalışanın mevcut toplam izin günlerini güncelle
        Calisan calisan = izinKayit.getCalisan();
        //int yeniToplamIzinGun = calisan.getToplamIzinGun() - (izinKayit.getAlinan_izin() - eskiAlinanIzin);
        int yeniToplamIzinGun = calisan.getToplamIzinGun() + eskiAlinanIzin - izinKayit.getAlinan_izin();
        calisan.setToplamIzinGun(yeniToplamIzinGun);
        calisanService.updateCalisan(calisan);

        IzinKayit updatedIzinKayit = izinKayitService.save(izinKayit);
        return ResponseEntity.ok(updatedIzinKayit);
    }
//    @PatchMapping("/{id}")
//    public ResponseEntity<IzinKayit> updateIzinKayitPartial(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
//        Optional<IzinKayit> izinKayitOpt = izinKayitService.findById(id);
//        if (!izinKayitOpt.isPresent()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
//
//        IzinKayit izinKayit = izinKayitOpt.get();
//
//        updates.forEach((key, value) -> {
//            if ("alinan_izin".equals(key)) {
//                izinKayit.setAlinan_izin((Integer) value);
//            }
//        });
//
//        IzinKayit updatedIzinKayit = izinKayitService.save(izinKayit);
//        return ResponseEntity.ok(updatedIzinKayit);
//    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteIzinKayit(@PathVariable Long id) {
        izinKayitService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}



//    @PatchMapping("/{id}")
//    public ResponseEntity<IzinKayit> partialUpdateIzinKayit(
//            @PathVariable(value = "id") Long id,
//            @RequestBody IzinKayit izinKayitDetails) {
//        Optional<IzinKayit> optionalIzinKayit = izinKayitService.findById(id);
//
//        if (optionalIzinKayit.isEmpty()) {
//            return ResponseEntity.notFound().build();
//        }
//
//        IzinKayit existingIzinKayit = optionalIzinKayit.get();
//
//        // Update only the fields that are not null in the request body
//        if (izinKayitDetails.getIzin_baslangic() != null) {
//            existingIzinKayit.setIzin_baslangic(izinKayitDetails.getIzin_baslangic());
//        }
//        if (izinKayitDetails.getIzin_bitis() != null) {
//            existingIzinKayit.setIzin_bitis(izinKayitDetails.getIzin_bitis());
//        }
//        if (izinKayitDetails.getCalisan() != null) {
//            existingIzinKayit.setCalisan(izinKayitDetails.getCalisan());
//        }
//
//        // Recalculate the leave days if the dates were updated
//        if (izinKayitDetails.getIzin_baslangic() != null || izinKayitDetails.getIzin_bitis() != null) {
//            LocalDate baslangic = existingIzinKayit.getIzin_baslangic();
//            LocalDate bitis = existingIzinKayit.getIzin_bitis();
//
//            long izinGunleriLong = ChronoUnit.DAYS.between(baslangic, bitis) + 1;
//            int izinGunleri = (int) izinGunleriLong;
//            existingIzinKayit.setAlinan_izin(izinGunleri);
//
//            Calisan calisan = existingIzinKayit.getCalisan();
//            int mevcutIzinGunleri = calisan.getToplamIzinGun();
//
//            if (izinGunleri > mevcutIzinGunleri) {
//                throw new IllegalArgumentException("Yeterli izin günü yok.");
//            }
//
//            // Update the employee's leave days only if dates are changed
//            calisan.setToplamIzinGun(mevcutIzinGunleri - izinGunleri);
//            calisanService.saveCalisan(calisan);
//        }
//
//        IzinKayit updatedIzinKayit = izinKayitService.save(existingIzinKayit);
//        return ResponseEntity.ok(updatedIzinKayit);
//    }