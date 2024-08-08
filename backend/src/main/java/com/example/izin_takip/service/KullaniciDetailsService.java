package com.example.izin_takip.service;

import com.example.izin_takip.models.Kullanici;
import com.example.izin_takip.repository.KullaniciRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

@Service
public class KullaniciDetailsService implements UserDetailsService {

    @Autowired
    private KullaniciRepository kullaniciRepository;

    @Override
    public UserDetails loadUserByUsername(String kullaniciAdi) throws UsernameNotFoundException {
        Kullanici kullanici = kullaniciRepository.findByKullaniciAdi(kullaniciAdi);
        if (kullanici == null) {
            throw new UsernameNotFoundException("Kullanıcı bulunamadı: " + kullaniciAdi);
        }

        return User.builder()
                .username(kullanici.getKullaniciAdi())
                .password(kullanici.getSifre())
                .roles(kullanici.getRol())
                .build();
    }
}
