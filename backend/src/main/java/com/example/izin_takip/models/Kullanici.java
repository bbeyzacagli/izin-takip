package com.example.izin_takip.models;
import lombok.Data;
import jakarta.persistence.*;

@Entity
@Data
public class Kullanici {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String kullaniciAdi;
    private String sifre;
    private String rol;

}
