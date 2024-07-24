package com.example.izin_takip.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "izin_kayit")
public class IzinKayit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long izin_id;
    private int izin_gun;
    private Date izin_baslangic;
    private Date izin_bitis;
    @ManyToOne
    @JoinColumn(name = "calisan_id")
    private Calisan calisan;
}
