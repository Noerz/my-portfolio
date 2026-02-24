---
id: blog-1
title: State Management Flutter yang Tetap Bersih di Tim Kecil
date: 2026-02-20
excerpt: Panduan memilih struktur state dan pola yang menjaga kode rapi, mudah diuji, dan tetap fleksibel saat aplikasi tumbuh.
tags: flutter, state-management, architecture
readTime: 8 min
slug: flutter-state-management-bersih
---

## Kenapa state management sering jadi sumber masalah

Banyak proyek Flutter dimulai dari satu layar sederhana, lalu berkembang jadi banyak fitur. Saat itulah state management mulai terasa berantakan. Widget yang awalnya sederhana berubah jadi file panjang, dan logic bisnis menyusup ke UI. Masalah utamanya bukan hanya library yang dipilih, tetapi bagaimana kita mendefinisikan batasan state dan aliran data sejak awal. Artikel ini membahas cara menata state agar tetap bersih dengan pendekatan yang bisa dipakai di tim kecil maupun solo.

## Mulai dari definisi state yang jelas

Sebelum memilih library, tentukan dulu jenis state yang ada di aplikasi. Umumnya ada tiga jenis: UI state (misalnya tab aktif dan toggle), screen state (loading, error, dan data), dan domain state (state yang merepresentasikan proses bisnis). Dengan memisahkan jenis state, kita jadi tahu di mana state itu seharusnya disimpan. UI state bisa dikelola di widget, screen state di view model, dan domain state di use case atau service.

## Pisahkan UI, state, dan domain

Pemisahan ini tidak harus rumit seperti clean architecture penuh. Tujuannya adalah mencegah code UI menampung logic bisnis. Cara praktisnya: buat satu class view model per layar, berisi state dan method yang memanggil repository. UI hanya mendengarkan state dan memanggil method. Di sisi lain, repository bertugas mengakses API atau database. Dengan struktur ini, perubahan di UI tidak mempengaruhi domain, dan sebaliknya.

## Pilih pola berdasarkan kebutuhan, bukan tren

Di Flutter ada banyak pilihan: Provider, Riverpod, Bloc, dan lain-lain. Prinsip dasarnya tetap sama: state harus berubah secara terprediksi dan mudah diuji. Jika tim kecil dan app tidak terlalu kompleks, Provider atau Riverpod cukup sederhana. Jika project besar dengan event kompleks, Bloc bisa membantu karena state dan event lebih eksplisit. Yang penting adalah konsistensi pola di seluruh feature.

## Studi kasus kecil: form pendaftaran

Bayangkan kamu punya form pendaftaran dengan field nama, email, dan password. Banyak developer menaruh semua state di `StatefulWidget` lalu memanggil API langsung. Ini cepat di awal, tetapi sulit ketika validasi semakin kompleks. Dengan view model sederhana, kamu bisa simpan state form, error, dan loading di satu tempat. UI hanya menampilkan state, sedangkan view model menangani validasi dan API. Jika nanti ada perubahan aturan password atau field baru, perubahan cukup dilakukan di view model.

## Kesalahan yang sering terjadi

- Menaruh state global untuk hal yang hanya dipakai satu screen
- Menggabungkan state domain dengan state UI seperti toggle dan tab
- Memakai banyak cara untuk update state dalam satu aplikasi
- Mengubah state langsung di widget tree yang dalam tanpa batasan

Kesalahan di atas membuat alur data sulit diikuti. Solusinya bukan ganti library, tetapi mengatur batasan dan disiplin dalam memilih tempat state.

## Strategi scaling tanpa ganti library

Jika aplikasi berkembang, kamu tidak harus langsung pindah library. Biasanya yang perlu diubah adalah cara memecah state menjadi bagian lebih kecil. Contoh: buat view model per fitur, jangan satu view model besar untuk seluruh app. Gunakan event yang jelas jika memakai Bloc, atau gunakan `StateNotifier` jika memakai Riverpod. Pastikan setiap feature memiliki kontrak repository sendiri agar tidak saling bergantung terlalu kuat.

## Contoh struktur folder yang sederhana

Struktur berikut cukup aman untuk aplikasi menengah:

- lib/
- features/
- auth/
- data/
- ui/
- view_model/
- core/
- network/
- shared/

Dengan struktur ini, setiap feature punya batasan yang jelas. UI dan view model berada dalam feature, sementara network dan shared utils berada di core. Struktur ini membantu tim menjaga fokus dan memudahkan onboarding developer baru.

## Contoh alur data yang bersih

Gunakan prinsip satu arah: UI -> ViewModel -> Repository -> DataSource. UI tidak boleh memanggil API langsung. ViewModel mengubah state yang dipantau oleh UI. Contoh sederhana:

```dart
class LoginViewModel extends ChangeNotifier {
  final AuthRepository repo;
  bool isLoading = false;
  String? error;

  LoginViewModel(this.repo);

  Future<void> login(String email, String password) async {
    isLoading = true;
    error = null;
    notifyListeners();

    final result = await repo.login(email, password);
    result.fold(
      (fail) => error = fail.message,
      (_) => error = null,
    );

    isLoading = false;
    notifyListeners();
  }
}
```

UI hanya menampilkan `isLoading` dan `error`. Logika autentikasi tetap berada di repository.

## Gunakan state yang kecil dan terukur

State yang terlalu besar membuat perubahan sulit dilacak. Bagi state jadi bagian kecil dan terukur. Misalnya pada screen list, pisahkan `items`, `isLoading`, dan `error`. Jika ada filter, buat state terpisah untuk filter agar tidak merusak state utama. Tujuannya agar perubahan state lebih mudah dimengerti dan tidak memicu rebuild yang tidak perlu.

## Checklist sebelum menambah state baru

- Apakah state ini benar-benar diperlukan di level global
- Apakah state bisa diturunkan dari data lain
- Apakah state ini berubah karena event user atau response server
- Apakah perubahan state harus memicu rebuild seluruh screen

Checklist sederhana ini mencegah state menumpuk dan menjaga kerapihan.

## Penutup

State management yang bersih tidak harus rumit. Mulailah dengan definisi state yang jelas, pisahkan UI dan domain, dan pilih pola yang sesuai dengan kebutuhan tim. Konsistensi lebih penting daripada trendy. Dengan struktur sederhana, aplikasi tetap mudah dirawat, testing lebih ringan, dan developer baru tidak perlu waktu lama untuk memahami alur data. Jika Anda menerapkan ini sejak awal, scaling aplikasi Flutter akan terasa jauh lebih nyaman.
