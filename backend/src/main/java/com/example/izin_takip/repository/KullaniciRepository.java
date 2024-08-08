package com.example.izin_takip.repository;

import com.example.izin_takip.models.Kullanici;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KullaniciRepository extends JpaRepository<Kullanici, Long> {
    Kullanici findByKullaniciAdi(String kullaniciAdi);
}
