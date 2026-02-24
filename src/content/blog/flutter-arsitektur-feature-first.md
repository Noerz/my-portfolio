---
id: blog-3
title: Arsitektur Feature-First di Flutter untuk Project yang Tumbuh
date: 2026-02-16
excerpt: Cara menata folder dan dependensi Flutter agar fitur bisa berkembang tanpa membuat kode makin sulit dirawat.
tags: flutter, architecture, clean
readTime: 9 min
slug: flutter-arsitektur-feature-first
---

## Kenapa feature-first lebih aman

Saat aplikasi bertambah, struktur `lib/` yang hanya dipisah berdasarkan type (model, service, widget) akan cepat penuh dan sulit dinavigasi. Feature-first membuat setiap fitur punya ruang sendiri, sehingga developer bisa fokus pada satu domain tanpa terganggu file lain. Selain itu, feature-first memaksa kita berpikir soal batasan dan dependensi antarf fitur, yang membuat codebase lebih stabil.

## Prinsip dasar feature-first

Dalam pendekatan ini, satu fitur berisi semua hal yang dibutuhkan untuk berjalan: UI, state, data access, dan util spesifik fitur. Contohnya `features/auth` punya folder `ui`, `view_model`, dan `data`. Fitur lain tidak boleh langsung mengakses detail internal fitur tersebut. Semua komunikasi antar fitur melewati layer yang disepakati, misalnya lewat service atau use case.

## Contoh struktur sederhana

Struktur minimal untuk project menengah:

- lib/
- core/
- network/
- storage/
- config/
- features/
- auth/
- ui/
- view_model/
- data/
- home/
- ui/
- view_model/
- data/

`core` menampung hal yang dipakai semua fitur seperti HTTP client, logger, atau error handling. Setiap fitur hanya boleh memakai `core` dan tidak langsung memakai `data` fitur lain.

## Penanganan dependency

Dependency injection membantu menjaga batasan ini. Buat `service locator` atau gunakan package seperti `get_it` untuk mendaftarkan dependency pada level aplikasi. Setiap fitur mendeklarasikan dependency sendiri, tetapi di-construct di layer bootstrap. Dengan begitu, fitur tidak bergantung pada implementasi konkret dari fitur lain.

## Pembagian layer di dalam feature

Layer minimal biasanya terdiri dari:

- UI: widget, screen, dan stateful UI
- ViewModel: state dan logic untuk UI
- Data: repository, datasource, mapper

Untuk project kecil, UI dan ViewModel bisa digabung, tetapi ketika team bertambah, pisahkan agar masing-masing layer punya tanggung jawab yang jelas. Hindari membuat UI langsung memanggil API. Repositori berada di data layer dan dipakai oleh ViewModel.

## Navigasi dan kontrak antarf fitur

Buat satu file routing di `core` atau `app` yang mendefinisikan semua route. Setiap feature hanya mengekspor screen entry point. Jika sebuah fitur butuh data dari fitur lain, buat interface di core yang bisa dipakai bersama. Ini mencegah fitur saling bergantung secara langsung.

## Migrasi dari struktur lama

Jika project sudah terlanjur memakai struktur berdasarkan type, kamu tidak perlu refactor besar-besaran sekaligus. Mulai dengan satu fitur baru dan letakkan dalam struktur feature-first. Setelah itu, pindahkan fitur lama secara bertahap saat ada perubahan besar di fitur tersebut. Cara ini mengurangi risiko dan tidak mengganggu jadwal release.

Pastikan kamu membuat catatan kecil di README internal tentang aturan baru. Developer lain perlu tahu lokasi file baru, cara menambah feature, dan batasan dependency. Migrasi bertahap lebih aman dan menjaga tim tetap produktif.

## Batasan komponen bersama

Komponen bersama seperti button, input, dan dialog sebaiknya ditempatkan di `core/ui` atau `shared/ui`. Namun jangan terlalu cepat memindahkan semua widget ke shared. Widget yang hanya dipakai oleh satu feature sebaiknya tetap di feature tersebut. Ini mencegah shared menjadi tempat sampah yang sulit dirawat.

Jika kamu punya design system, letakkan token warna, typography, dan spacing di `core/theme`. Komponen shared sebaiknya hanya menggunakan token ini. Dengan begitu, perubahan tema tidak perlu mengubah banyak file. Batasan ini menjaga konsistensi visual tanpa membuat semua widget saling bergantung.

## Testing dan dokumentasi

Feature-first membuat testing lebih mudah karena setiap fitur terisolasi. Kamu bisa menulis test untuk ViewModel dan repository di dalam folder feature. Jika fitur cukup kompleks, buat file dokumentasi kecil yang menjelaskan alur data, dependency, dan keputusan arsitektur. Dokumentasi ringan ini membantu saat onboarding atau saat melakukan refactor.

## Tips menjaga konsistensi

1. Buat template folder feature untuk onboarding.
2. Hindari duplikasi util kecil, letakkan di core jika dipakai bersama.
3. Jaga nama folder konsisten: `ui`, `view_model`, `data`.
4. Tambahkan README kecil di setiap feature jika logicnya kompleks.

## Contoh kontrak repository

```dart
abstract class ProfileRepository {
  Future<Profile> getProfile();
}

class ProfileRepositoryImpl implements ProfileRepository {
  final ApiClient api;
  ProfileRepositoryImpl(this.api);

  @override
  Future<Profile> getProfile() async {
    final response = await api.get("/profile");
    return Profile.fromJson(response.data);
  }
}
```

UI hanya tahu `ProfileRepository`, bukan detail HTTP.

## Penutup

Feature-first membuat project lebih rapi dan scalable. Dengan batasan jelas, perubahan di satu fitur tidak merusak fitur lain. Developer baru lebih cepat memahami struktur karena semua kebutuhan fitur ada di satu tempat. Mulailah dari struktur sederhana, lalu tambah aturan seiring pertumbuhan. Konsistensi dan batasan adalah kunci.
