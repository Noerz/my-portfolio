---
id: blog-10
title: Checklist Keamanan Dasar untuk API Node.js
date: 2026-02-02
excerpt: Daftar praktis langkah keamanan yang bisa langsung diterapkan untuk melindungi API Node.js di production.
tags: nodejs, security, api
readTime: 9 min
slug: nodejs-security-checklist
---

## Keamanan bukan fitur tambahan

Keamanan adalah bagian dari kualitas aplikasi. Banyak insiden terjadi bukan karena bug besar, tetapi karena hal dasar seperti validasi input yang kurang, secret yang bocor, atau endpoint yang terbuka tanpa autentikasi. Artikel ini merangkum checklist sederhana yang dapat langsung diterapkan.

## Validasi input selalu di awal

Semua input dari user harus divalidasi. Jangan percaya data dari client. Gunakan schema validation seperti `zod` atau `joi`. Jika ingin ringan, buat validasi manual yang jelas. Validasi harus dilakukan sebelum data masuk ke service.

## Batasi ukuran request

Serangan sederhana bisa datang dari payload besar yang membuat server kehabisan memory. Batasi ukuran body request, terutama untuk endpoint upload. Ini bisa dilakukan di middleware. Jika ada kebutuhan upload besar, gunakan endpoint khusus dengan aturan berbeda.

## Autentikasi dan otorisasi

Gunakan JWT atau session yang aman. Pastikan token memiliki expiry. Otorisasi harus mengecek role atau permission, bukan hanya apakah user login. Jangan lupa memproteksi endpoint admin dan internal.

## CORS dan CSRF

Jika API dipakai oleh browser, atur CORS dengan ketat. Izinkan hanya domain yang perlu. Untuk aplikasi berbasis cookie, pertimbangkan proteksi CSRF. Gunakan token CSRF dan pastikan cookie memiliki flag `HttpOnly` dan `SameSite` yang sesuai.

## Lindungi dari brute force

Tambahkan rate limiting untuk endpoint login atau reset password. Batasi jumlah request per IP dalam periode tertentu. Ini bisa dilakukan dengan middleware sederhana dan Redis sebagai store.

## Gunakan HTTPS dan security headers

Pastikan seluruh traffic lewat HTTPS. Tambahkan header seperti `Content-Security-Policy`, `X-Frame-Options`, dan `X-Content-Type-Options`. Di Express, kamu bisa memakai `helmet` untuk memudahkan setup.

## Sanitasi input

Selain validasi tipe dan format, lakukan sanitasi untuk mencegah injection. Untuk query SQL, gunakan parameterized query atau ORM. Untuk input yang akan ditampilkan kembali, lakukan escaping agar tidak terjadi XSS. Sanitasi adalah lapisan tambahan setelah validasi.

## Upload file yang aman

Jika aplikasi menerima file, batasi jenis file dan ukuran. Simpan file di storage terpisah, jangan di server utama. Lakukan scan sederhana untuk file berbahaya jika memungkinkan. Jangan pernah mengeksekusi file yang diunggah user.

## Atur policy dependency

Selain audit, buat kebijakan penggunaan dependency. Misalnya, hanya boleh menambah dependency yang aktif dirawat dan punya release rutin. Kebijakan sederhana ini mengurangi risiko memakai package yang tidak aman atau sudah tidak terawat.

## Penyimpanan token yang aman

Jika kamu memakai JWT di browser, simpan token dengan aman. Hindari localStorage untuk data sensitif jika memungkinkan, gunakan HttpOnly cookie agar lebih aman dari XSS. Pastikan cookie memiliki `Secure` dan `SameSite` yang sesuai dengan kebutuhan.

## Perhatikan reverse proxy

Jika aplikasi berada di belakang reverse proxy, pastikan header seperti `X-Forwarded-For` dan `X-Forwarded-Proto` diatur dengan benar. Kesalahan konfigurasi bisa membuat aplikasi menganggap request tidak aman atau mencatat IP yang salah. Pastikan juga proxy tidak membuka endpoint internal ke publik.

## Lockfile dan pin version

Pastikan project memiliki lockfile agar dependency versi tetap konsisten di semua environment. Hindari mengizinkan update major tanpa review. Dengan lockfile, kamu bisa mengontrol perubahan dependency dan mengurangi risiko update tiba-tiba membawa kerentanan baru.

Terapkan prinsip least privilege pada akses database dan service. Akun aplikasi sebaiknya hanya memiliki izin yang dibutuhkan, bukan akses penuh. Ini mengurangi dampak jika kredensial bocor.

Audit permission secara berkala agar akses tidak melebar tanpa alasan yang jelas.

## Kelola secret dengan aman

Jangan simpan API key di repo. Gunakan environment variables dan secret manager. Pastikan file `.env` tidak masuk ke git. Rotasi secret secara berkala jika memungkinkan.

## Dependency audit

Node.js memiliki ekosistem besar, dan ini berarti risiko dependency. Jalankan `npm audit` atau gunakan tool seperti `snyk`. Hindari package yang tidak terawat atau jarang update. Review dependency secara berkala.

## Logging keamanan

Catat event penting seperti login gagal berulang, perubahan password, atau akses endpoint sensitif. Log ini berguna untuk audit dan deteksi dini. Pastikan log tidak menyimpan data sensitif seperti password.

## Penutup

Keamanan tidak harus rumit. Dengan checklist sederhana seperti validasi input, rate limiting, HTTPS, dan dependency audit, kamu sudah melindungi API dari banyak risiko umum. Terapkan secara konsisten dan jadikan bagian dari budaya development. Lebih baik mencegah daripada memperbaiki setelah terjadi insiden.
