---
id: blog-6
title: Struktur Service Node.js yang Rapi untuk Tim Kecil
date: 2026-02-10
excerpt: Cara menyusun folder, layer, dan kontrak di Node.js agar tim kecil tetap cepat tanpa mengorbankan kualitas.
tags: nodejs, architecture, backend
readTime: 8 min
slug: nodejs-struktur-service
---

## Masalah umum di project Node.js

Banyak project Node.js dimulai dari satu file `index.js`, lalu berkembang jadi banyak file tanpa struktur. Akibatnya, logic bisnis bercampur dengan routing, error handling tidak konsisten, dan testing menjadi sulit. Untuk tim kecil, struktur yang terlalu rumit juga menghambat kecepatan. Kuncinya adalah membuat struktur yang minimal namun jelas.

## Prinsip dasar struktur yang sehat

Pertama, pisahkan layer: routing, controller, service, dan data access. Routing hanya mengatur URL dan method. Controller menerima request dan memanggil service. Service berisi logic bisnis. Data access berisi query database. Dengan pemisahan ini, perubahan di satu layer tidak merusak layer lain.

## Contoh struktur folder sederhana

- src/
- routes/
- controllers/
- services/
- repositories/
- models/
- middlewares/
- config/

Jika menggunakan TypeScript, tambahkan folder `types` untuk definisi tambahan. Hindari membuat folder berlebihan, tetapi pastikan setiap file punya lokasi yang jelas.

## Konvensi error handling

Buat satu error handler di middleware. Service mengembalikan error dengan tipe yang jelas, misalnya `ValidationError` atau `NotFoundError`. Controller hanya meneruskan error ke middleware. Dengan ini, response error konsisten dan mudah dipantau.

```ts
export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Unexpected error",
  });
};
```

## Validasi request sejak awal

Gunakan middleware validasi agar service menerima data yang sudah bersih. Ini mencegah if-check berulang di service. Bisa memakai `zod` atau `joi`, tetapi jika ingin ringan, validasi manual juga bisa. Yang penting adalah konsistensi.

## DTO untuk kontrak data

Gunakan Data Transfer Object agar data yang masuk dan keluar service konsisten. DTO membantu menghindari kebocoran field sensitif dan memastikan format response stabil. Dengan DTO, perubahan di model database tidak langsung mempengaruhi response API.

## Manajemen konfigurasi

Simpan konfigurasi di satu tempat, misalnya `config/`. Gunakan environment variable untuk nilai sensitif seperti database URL dan token. Jangan akses `process.env` langsung di banyak file. Buat helper `getConfig()` agar mudah diuji dan konsisten.

## Versioning route

Tambahkan versi pada route jika API sudah dipakai banyak client. Contoh: `/v1/users`. Ini memberi ruang untuk perubahan besar tanpa merusak client lama. Versioning sederhana cukup untuk tim kecil, namun menjaga kompatibilitas ketika produk berkembang.

## Dokumentasi API

Dokumentasi membantu tim dan client memahami endpoint. Kamu bisa menulis dokumen manual atau menggunakan OpenAPI. Simpan dokumentasi di repo agar mudah diupdate. Dengan dokumentasi yang jelas, proses integrasi menjadi lebih cepat dan mengurangi miskomunikasi.

## Konvensi penamaan dan batasan

Gunakan konvensi penamaan yang konsisten seperti `UserController`, `UserService`, dan `UserRepository`. Hindari nama yang terlalu umum seperti `Helper` atau `Utils` tanpa konteks. Konvensi ini membantu developer baru memahami arsitektur tanpa banyak bertanya.

Untuk menjaga batasan layer, kamu bisa menambahkan lint rule atau review checklist sederhana: controller tidak boleh mengakses repository langsung, dan repository tidak boleh bergantung pada HTTP. Aturan ini kecil, tetapi menjaga struktur tetap rapi.

Jika project memakai module alias, pastikan path alias konsisten agar import mudah dibaca. Ini mengurangi relative path panjang dan membuat codebase lebih nyaman dinavigasi.

Alias yang rapi mempercepat review dan mengurangi konflik saat refactor.

## Testing jadi lebih mudah

Struktur yang rapi mempermudah unit test. Service bisa diuji tanpa HTTP, repository bisa dimock, dan controller bisa diuji secara terpisah. Dengan ini, kamu bisa menjaga kualitas tanpa menulis integration test yang berat untuk setiap perubahan.

## Gunakan service untuk proses bisnis

Service harus fokus pada proses bisnis, bukan pada detail HTTP. Misalnya, `createOrder` di service menerima data yang sudah valid dan mengembalikan hasil. Controller yang bertugas menyesuaikan response. Dengan pola ini, service lebih mudah diuji dan bisa dipakai ulang.

## Repository untuk akses data

Jika project kecil, repository bisa sederhana, tetapi tetap berguna. Tujuannya agar query database tidak menyebar di berbagai file. Jika nanti pindah database, perubahan hanya terjadi di layer repository.

## Penutup

Struktur service yang rapi membuat tim kecil tetap cepat. Dengan layer yang jelas, developer dapat fokus pada logic bisnis tanpa bingung mencari file. Konsistensi folder dan error handling akan menghemat waktu jangka panjang. Mulailah dari struktur sederhana, lalu kembangkan seiring kebutuhan. Ini adalah investasi kecil dengan dampak besar.
