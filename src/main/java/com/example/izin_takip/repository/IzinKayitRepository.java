package com.example.izin_takip.repository;

import com.example.izin_takip.models.IzinKayit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IzinKayitRepository extends JpaRepository<IzinKayit, Long> {
}
