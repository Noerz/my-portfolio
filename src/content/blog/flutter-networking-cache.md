---
id: blog-4
title: Strategi Networking dan Cache di Flutter yang Realistis
date: 2026-02-14
excerpt: Panduan membangun layer networking dan cache yang sederhana namun siap dipakai di aplikasi Flutter skala produksi.
tags: flutter, networking, cache
readTime: 8 min
slug: flutter-networking-cache
---

## Masalah umum di layer networking

Banyak aplikasi Flutter langsung memakai `http` tanpa layer yang jelas. Hasilnya, setiap screen membuat request sendiri, sulit dipantau, dan error handling tidak konsisten. Selain itu, cache sering diabaikan sampai pengguna mengeluh loading lama. Padahal, dengan layer sederhana dan strategi cache yang tepat, pengalaman pengguna bisa jauh lebih baik.

## Bangun layer network yang konsisten

Mulai dengan satu HTTP client yang dikonfigurasi untuk seluruh app. Tambahkan interceptors untuk menambah header, logging, dan error normalization. Kamu bisa memakai `Dio` atau `http`. Yang penting, semua request lewat satu pintu. Buat `ApiClient` yang menyediakan method GET, POST, PUT, DELETE, dan menangani timeout.

## Gunakan repository sebagai gerbang data

UI tidak boleh tahu detail API. Gunakan repository untuk menyediakan data yang dibutuhkan screen. Repository memutuskan apakah data diambil dari network atau cache. Ini membuat UI tetap sederhana dan membuat perubahan API tidak mempengaruhi UI.

## Cache sederhana dengan pola stale-while-revalidate

Pendekatan praktis: tampilkan data cache segera, lalu refresh di background. Jika data baru berbeda, update UI. Ini membuat aplikasi terasa cepat. Cache bisa berupa memory cache untuk data yang sering dipakai, dan local storage untuk data yang perlu bertahan lama. Kuncinya adalah menentukan waktu validasi.

Untuk data yang sangat sensitif terhadap perubahan, kamu bisa memakai cache dengan TTL yang pendek. Jika data bersifat statis seperti kategori produk, TTL bisa lebih panjang. Buat kebijakan sederhana agar developer tidak menebak-nebak. Dokumentasikan TTL dan alasan di repository supaya konsisten.

## Contoh alur fetch sederhana

```dart
class ArticleRepository {
  final ApiClient api;
  final ArticleCache cache;

  ArticleRepository(this.api, this.cache);

  Future<List<Article>> getArticles() async {
    final cached = await cache.read();
    if (cached.isNotEmpty) {
      _refreshInBackground();
      return cached;
    }

    final data = await api.get("/articles");
    final articles = Article.fromList(data);
    await cache.write(articles);
    return articles;
  }

  Future<void> _refreshInBackground() async {
    try {
      final data = await api.get("/articles");
      await cache.write(Article.fromList(data));
    } catch (_) {}
  }
}
```

## Tentukan strategi cache per fitur

Tidak semua data perlu cache panjang. Data profil mungkin aman disimpan beberapa jam, tetapi data harga harus segar. Buat aturan sederhana per endpoint: TTL, apakah cache boleh dipakai saat offline, dan apakah perlu prefetch. Simpan aturan ini di repository agar mudah dilacak.

## Offline mode minimal

Offline mode tidak harus kompleks. Minimalnya, aplikasi dapat menampilkan data terakhir dan memberi label bahwa data mungkin tidak terbaru. Ini sudah jauh lebih baik daripada layar kosong. Jika ingin lebih lanjut, simpan antrean request write dan kirim saat online kembali.

## Retry dan backoff sederhana

Koneksi mobile tidak selalu stabil. Buat retry dengan batas dan jeda yang jelas agar request tidak menumpuk. Gunakan exponential backoff untuk mencegah spamming server. Hindari retry untuk error 4xx karena biasanya bukan masalah jaringan. Retry hanya untuk error 5xx atau timeout.

## Refresh token yang aman

Jika app menggunakan token, buat mekanisme refresh yang terpusat di HTTP client. Saat token expired, interceptors bisa melakukan refresh sekali lalu mengulang request yang gagal. Hindari refresh token dari berbagai tempat karena dapat membuat race condition. Simpan status refresh agar request lain menunggu hasil refresh.

## Strategi invalidasi cache

Cache harus dihapus ketika data berubah. Misalnya, setelah user update profil, cache profil harus dihapus atau diperbarui. Tentukan aturan invalidasi di repository, bukan di UI. Dengan begitu, UI tetap sederhana dan cache tidak menjadi sumber bug.

## Versi cache dan migrasi

Jika kamu menyimpan cache di local storage, perhatikan versi schema. Saat struktur data berubah, cache lama bisa menyebabkan crash. Solusi sederhana: simpan versi cache di storage dan jika versi tidak cocok, hapus cache lama. Ini lebih aman daripada mencoba migrasi kompleks, terutama untuk aplikasi kecil hingga menengah.

## Error handling yang konsisten

Buat satu jenis error untuk seluruh app, misalnya `AppError` dengan tipe `network`, `timeout`, `unauthorized`, dan `unknown`. Repository mengubah error dari HTTP client menjadi `AppError`. UI hanya menampilkan pesan yang sesuai, tidak perlu tahu detail response.

## Penutup

Layer networking yang konsisten membuat aplikasi lebih mudah dirawat. Cache yang tepat membuat aplikasi terasa cepat dan andal, terutama di koneksi buruk. Mulailah dari satu HTTP client, repository yang rapi, dan strategi cache sederhana. Jangan tunggu sampai performance jadi masalah. Dengan fondasi yang rapi, setiap fitur baru akan lebih mudah ditambahkan.
