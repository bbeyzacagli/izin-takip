package com.example.izin_takip.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "izin_kayit")
public class IzinKayit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long izin_id;
    private int alinan_izin;
    @ManyToOne
    @JoinColumn(name = "calisan_id", nullable = false)
    private Calisan calisan;
}