package com.example.izin_takip.repositories;

import com.example.izin_takip.models.Calisan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CalisanRepository extends JpaRepository<Calisan, Long> {
}
