---
id: blog-7
title: Logging dan Monitoring di Node.js agar Produksi Tetap Sehat
date: 2026-02-08
excerpt: Panduan membangun logging yang rapi, metrik penting, dan monitoring dasar untuk layanan Node.js.
tags: nodejs, observability, backend
readTime: 9 min
slug: nodejs-logging-monitoring
---

## Logging bukan sekadar console.log

Di production, log adalah alat utama untuk memahami apa yang terjadi. Log yang tidak terstruktur sulit dicari dan tidak membantu debugging. Gunakan logging terstruktur yang konsisten, misalnya JSON, agar mudah diproses oleh tool seperti ELK atau Loki. Setiap log harus punya level dan context yang jelas.

Sertakan field standar seperti `timestamp`, `service`, `requestId`, dan `userId` jika ada. Dengan format konsisten, kamu bisa membuat query log dengan mudah dan menggabungkan log dari berbagai service. Format yang rapi membuat log benar-benar bisa dipakai saat insiden.

## Tentukan level log dengan disiplin

Gunakan level seperti `info`, `warn`, `error`, dan `debug`. Log `debug` berguna saat troubleshooting, tapi jangan terlalu banyak di production. Log `error` harus mencatat stack trace dan context penting seperti `requestId`. Dengan aturan yang jelas, log menjadi lebih berguna.

## Tambahkan correlation id

Saat request melewati banyak service, correlation id membantu melacak flow. Buat middleware yang menambahkan `requestId` ke setiap request dan masukkan ke log. Dengan ini, kamu bisa melihat semua log yang terkait dengan satu request.

```ts
app.use((req, res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
```

## Monitoring metrik yang penting

Logging tidak cukup. Kamu juga butuh metrik seperti response time, error rate, dan throughput. Metrik ini bisa dikirim ke Prometheus atau layanan monitoring lainnya. Fokus pada metrik yang benar-benar penting untuk business. Jangan mengumpulkan terlalu banyak metrik yang tidak dipakai.

## Sampling agar log tetap ringan

Di sistem dengan traffic tinggi, log terlalu banyak bisa mahal. Gunakan sampling untuk log level info, tetapi jangan sampling log error. Misalnya, simpan hanya 10 persen log info ketika traffic tinggi. Sampling menjaga biaya tanpa kehilangan visibilitas atas error.

## Hindari menyimpan data sensitif

Log tidak boleh berisi password, token, atau data pribadi. Masking data sensitif adalah praktik wajib. Buat helper untuk menyaring payload sebelum dicatat. Jika kamu memakai logger seperti pino, gunakan serializer untuk memfilter field tertentu.

## Tracing sederhana

Jika sistem mulai terdiri dari beberapa service, tracing membantu melihat perjalanan request. Kamu bisa menambahkan trace id di header dan meneruskannya ke service berikutnya. Dengan tracing sederhana ini, kamu bisa menyatukan log dari berbagai service dan memahami bottleneck lebih cepat.

## Retensi log

Tentukan berapa lama log harus disimpan. Untuk sistem kecil, 7 sampai 14 hari bisa cukup. Jika ada kebutuhan audit, simpan lebih lama di storage yang lebih murah. Tanpa kebijakan retensi, biaya log bisa meningkat tanpa disadari.

Rotasi log secara terjadwal juga penting agar storage lokal tidak penuh. Jika kamu memakai container, pastikan log tidak mengisi disk host. Kebijakan retensi dan rotasi membuat log tetap berguna tanpa membebani infrastruktur.

## Alert yang berguna

Alert harus actionable. Misalnya, alert jika error rate naik di atas 5 persen selama 5 menit. Hindari alert yang terlalu sering karena akan diabaikan. Mulai dari alert minimal, lalu tambah ketika sudah paham pola traffic.

## Dashboard sederhana

Buat dashboard yang menampilkan request per menit, error rate, latency p95, dan penggunaan CPU atau memory. Jangan terlalu banyak grafik. Dashboard harus memberikan gambaran cepat tentang kesehatan sistem. Dengan ini, kamu bisa melihat tren sebelum terjadi masalah besar.

## SLO dan error budget

Jika layanan sudah kritis, tentukan Service Level Objective seperti 99.5 persen uptime atau latency p95 di bawah 300 ms. Error budget adalah toleransi kegagalan yang masih diterima. Dengan SLO, tim punya target jelas dan bisa memutuskan kapan harus fokus pada stabilitas dibanding menambah fitur baru.

Catat juga siapa yang bertanggung jawab saat insiden. Playbook sederhana membuat tim lebih cepat merespons ketika alert muncul, sehingga waktu pemulihan bisa lebih singkat.

## Praktik sederhana yang bisa langsung dipakai

- Gunakan logger seperti `pino` atau `winston`
- Log request dan response dengan ringkasan, bukan payload penuh
- Simpan log di stdout agar mudah di-ship ke tool lain
- Tambahkan metadata seperti `userId` jika ada

## Penutup

Logging dan monitoring membuat layanan Node.js lebih stabil. Dengan log terstruktur dan metrik dasar, kamu bisa mendeteksi masalah lebih cepat dan mengurangi downtime. Mulailah dari langkah kecil: logger konsisten, correlation id, dan metrik utama. Dari situ, tim bisa mengembangkan observability sesuai kebutuhan.
