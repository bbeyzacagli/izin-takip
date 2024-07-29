package com.example.izin_takip.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "calisan")
public class Calisan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long calisan_id;
    private String ad;
    private String soyad;
    private String email;
    private String departman;
    private String tel_no;
    private String tc_no;
    @Column(name = "izin_gun")
    private int toplamIzinGun = 15;
}