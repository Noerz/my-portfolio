---
id: blog-8
title: Optimasi Performa API Node.js Tanpa Drama
date: 2026-02-06
excerpt: Teknik praktis untuk membuat API Node.js lebih cepat dengan fokus pada database, caching, dan response yang efisien.
tags: nodejs, performance, api
readTime: 9 min
slug: nodejs-api-performance
---

## Performa API bukan hanya soal Node.js

Performa API sering dianggap masalah runtime, padahal bottleneck biasanya ada di database atau jaringan. Fokus pertama adalah query yang efisien. Pastikan index sudah tepat dan hindari query N+1. Jika database lambat, secepat apa pun Node.js tetap tidak akan membantu. Jadi, optimasi API harus dimulai dari data layer.

## Disiplin query di database

Review query paling sering dipakai dan pastikan ada index yang sesuai. Hindari memilih semua kolom jika hanya butuh dua atau tiga field. Untuk query yang berat, pertimbangkan membuat materialized view atau denormalisasi ringan. Disiplin di data layer sering memberi dampak terbesar dibanding optimasi di kode.

## Batasi payload response

Kirim hanya data yang dibutuhkan. Jika response terlalu besar, transfer akan lambat dan parsing di client juga berat. Gunakan pagination dan field selection. Misalnya, untuk daftar produk, cukup kirim id, nama, dan harga. Detail produk bisa di endpoint terpisah.

## Strategi pagination yang tepat

Offset pagination mudah diimplementasikan, tetapi bisa lambat jika data besar. Cursor pagination lebih cepat karena database tidak perlu skip banyak row. Pilih strategi sesuai kebutuhan. Jika data sering berubah, cursor pagination biasanya lebih stabil. Pastikan API mengembalikan `nextCursor` agar client mudah melanjutkan.

## Caching di level yang tepat

Cache bisa di level database, application, atau CDN. Untuk endpoint dengan data jarang berubah, cache response di Redis dengan TTL. Untuk data yang sangat statis, gunakan CDN. Jangan cache semua hal, pilih endpoint yang benefit paling besar.

## Batasi concurrency yang berbahaya

Jika satu endpoint memicu banyak query, batasi concurrency agar database tidak overload. Gunakan pool dan buat batas di layer service. Ini mencegah spike traffic membuat seluruh sistem melambat.

## Compression untuk response besar

Aktifkan gzip atau brotli untuk response besar. Ini mengurangi ukuran payload tanpa banyak usaha. Namun untuk response kecil, compression bisa jadi overhead, jadi aktifkan hanya untuk ukuran tertentu. Banyak framework sudah menyediakan middleware untuk ini.

## Hindari N+1 dengan batching

Jika satu endpoint memanggil database berkali-kali untuk setiap item, performa akan turun drastis. Gunakan query batch atau join agar data diambil sekaligus. Untuk API yang sering dipakai, pertimbangkan membuat endpoint agregasi yang mengembalikan data lengkap agar client tidak perlu memanggil banyak endpoint.

## Edge caching untuk konten publik

Jika ada endpoint publik yang banyak diakses, gunakan caching di edge atau CDN. Ini mengurangi beban server dan mempercepat response global. Pastikan ada header cache yang jelas agar CDN tahu kapan harus menyimpan atau memvalidasi ulang data.

Cache header seperti `Cache-Control` dan `ETag` membantu client melakukan revalidasi tanpa mengunduh ulang data. Dengan header yang tepat, beban bandwidth berkurang dan response terasa lebih cepat, terutama untuk endpoint yang jarang berubah.

## Gunakan connection pooling

Jika memakai database seperti PostgreSQL, pastikan connection pool diatur dengan benar. Pool terlalu kecil bisa membuat request menunggu. Pool terlalu besar bisa membuat database overload. Sesuaikan dengan kapasitas server dan traffic.

## Hindari blocking di event loop

Node.js single-threaded untuk event loop. Jika kamu melakukan CPU heavy task, event loop akan tersendat. Pindahkan kerja berat ke worker thread atau service terpisah. Misalnya, image processing atau kompresi besar.

## Contoh caching sederhana

```ts
const cacheKey = `users:${page}`;
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);

const data = await userRepo.find(page);
await redis.setex(cacheKey, 60, JSON.stringify(data));
return data;
```

## Monitoring performa endpoint

Gunakan APM atau log timing. Catat waktu eksekusi per endpoint dan cari yang paling lambat. Optimasi satu endpoint lambat sering memberi dampak lebih besar daripada optimasi kecil di banyak endpoint.

## Rate limiting untuk stabilitas

Performa juga dipengaruhi oleh penggunaan yang berlebihan. Tambahkan rate limiting untuk endpoint publik agar sistem tetap stabil. Ini bukan hanya soal keamanan, tetapi juga menjaga resource agar tidak habis saat traffic melonjak.

## Gunakan HTTP keep-alive

Aktifkan keep-alive agar koneksi tidak perlu dibuka ulang untuk setiap request. Ini mengurangi latency terutama di jaringan lambat. Banyak HTTP client sudah mendukungnya, tetapi pastikan konfigurasi server juga sesuai.

## Penutup

Optimasi API Node.js tidak harus rumit. Fokus pada query database, payload, dan caching. Pastikan event loop tidak terblokir dan gunakan pooling yang benar. Dengan langkah ini, performa API meningkat secara signifikan dan aplikasi terasa lebih responsif.
