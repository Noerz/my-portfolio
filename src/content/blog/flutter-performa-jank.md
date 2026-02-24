---
id: blog-2
title: Mengurangi Jank dan Menjaga UI Flutter Tetap Halus
date: 2026-02-18
excerpt: Strategi praktis untuk menjaga animasi dan scroll Flutter tetap mulus dengan fokus pada frame budget, build kecil, dan isolasi kerja berat.
tags: flutter, performance, ui
readTime: 8 min
slug: flutter-performa-jank
---

## Kenali frame budget di Flutter

Flutter menargetkan 60 fps atau 120 fps tergantung perangkat. Artinya setiap frame hanya punya sekitar 16 ms atau 8 ms untuk selesai. Jika lebih lama, maka jank muncul. Kebanyakan jank bukan karena animasi rumit, tetapi karena build widget yang terlalu berat atau kerja sinkron di thread UI. Tujuan kita adalah mengurangi beban di UI thread dan meminimalkan rebuild yang tidak perlu.

## Ukur dulu sebelum optimasi

Profiling lebih penting daripada asumsi. Gunakan `Flutter DevTools` dan lihat tab Performance. Perhatikan timeline dan bagian yang memakan waktu paling lama. Jika masalah ada di `build`, berarti widget tree terlalu besar atau terlalu sering rebuild. Jika masalah ada di `raster`, biasanya gambar terlalu besar atau efek blur terlalu mahal. Dengan data ini, optimasi menjadi terarah.

Selain timeline, periksa juga tab `Widget Rebuild Stats` untuk mengetahui widget mana yang terlalu sering rebuild. Banyak kasus jank muncul karena `setState` memicu rebuild besar padahal perubahan kecil. Gunakan profiler ini untuk memilih area yang benar-benar perlu dioptimasi. Jangan mengubah banyak bagian sekaligus tanpa data, karena kamu tidak akan tahu mana yang memberi dampak.

## Kecilkan area rebuild

Gunakan `const` sebanyak mungkin untuk widget statis. Pisahkan bagian UI yang sering berubah ke widget terpisah agar rebuild tidak menyebar. Misalnya, jika hanya counter yang berubah, jangan rebuild seluruh screen. Gunakan `ValueListenableBuilder`, `StreamBuilder`, atau state management yang granular agar update hanya terjadi di bagian kecil.

## Optimasi list dan grid

List adalah sumber jank paling umum. Pastikan menggunakan `ListView.builder` atau `GridView.builder`. Hindari `shrinkWrap` jika tidak perlu karena membuat layout jadi mahal. Gunakan `itemExtent` jika tinggi item konsisten. Jangan render gambar besar tanpa resize. Jika list sangat panjang, pertimbangkan pagination dan virtual scrolling.

## Hindari kerja berat di UI thread

Parsing JSON besar, kompresi image, atau perhitungan berat harus dipindah ke isolate. Flutter menyediakan `compute` untuk kasus sederhana. Jika kamu melakukan parsing besar di UI thread, animasi akan tersendat. Pindahkan kerja berat ke isolate lalu kirim hasilnya ke UI.

```dart
final data = await compute(parseLargeJson, rawJson);
```

## Render gambar dengan bijak

Gambar besar dapat memakan memory dan waktu rasterisasi. Gunakan ukuran image yang sesuai. Untuk jaringan, gunakan caching yang tepat. Periksa `cacheWidth` dan `cacheHeight` agar Flutter tidak merender lebih besar dari kebutuhan. Jika memakai gambar transparan besar, pertimbangkan format yang lebih efisien.

## Gunakan RepaintBoundary

Jika ada area animasi kompleks, bungkus dengan `RepaintBoundary` agar Flutter tidak me-render ulang bagian lain. Ini terutama berguna untuk widget yang selalu berubah seperti chart atau animasi custom. Namun jangan berlebihan karena terlalu banyak boundary juga memberi overhead.

## Animasi yang efisien

Gunakan `AnimatedContainer`, `AnimatedOpacity`, dan `TweenAnimationBuilder` untuk animasi sederhana. Hindari memicu setState di setiap frame jika bisa memakai `AnimationController`. Pastikan animasi berjalan di layer kompositor, bukan membuat layout ulang setiap frame.

## Checklist cepat anti jank

- Gunakan `const` untuk widget statis
- Pecah widget tree agar rebuild lebih kecil
- Gunakan `ListView.builder` untuk list panjang
- Pindahkan kerja berat ke isolate
- Batasi ukuran image dan gunakan caching

## Pola optimasi bertahap

1. Profiling untuk menemukan frame yang lambat
2. Identifikasi apakah masalah di build atau raster
3. Kecilkan area rebuild atau optimasi list
4. Pindahkan kerja berat ke isolate
5. Ulangi profiling untuk memastikan perbaikan

Langkah bertahap ini penting agar kamu tidak melakukan optimasi yang tidak perlu. Beberapa perubahan kecil seperti membuat widget statis menjadi `const` sering memberi dampak signifikan.

## Kasus umum yang sering terlewat

Beberapa sumber jank yang sering terlewat adalah penggunaan `Opacity` pada widget besar, efek blur berulang, dan animasi yang memicu layout ulang. Jika membutuhkan efek blur, pertimbangkan mengganti dengan gambar statis. Jika memakai `Opacity`, pastikan area kecil. Untuk animasi layout, gunakan transform jika memungkinkan, karena transform tidak memicu layout ulang.

## Penutup

Jank bukan sesuatu yang harus diterima. Dengan memahami frame budget dan memakai profiling secara rutin, kamu bisa membuat Flutter terasa halus di perangkat menengah. Optimasi tidak harus rumit, cukup fokus pada titik yang paling mahal. Mulai dari kecilkan rebuild, optimasi list, dan pindahkan kerja berat. Hasilnya, UI terasa responsif, animasi halus, dan pengalaman pengguna jauh lebih baik.
