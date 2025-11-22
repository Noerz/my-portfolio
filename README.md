## Portfolio Next.js

Struktur awal proyek portfolio pribadi berbasis Next.js (App Router) dengan dummy data dan arsitektur yang mudah di-scale ke backend API nanti.

### Jalankan Lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

### Struktur Direktori Penting

```
src/
	types/            // Domain types (Project, PortfolioData)
	data/             // Dummy data sementara
	lib/              // Service layer (getPortfolioData)
	components/       // Komponen presentational & section wrappers
	app/              // Next.js app router pages & layout
```

### Prinsip & Best Practice

- Single Responsibility: setiap komponen fokus pada 1 hal (Hero, ProjectsSection, dll).
- Dependency Inversion: UI tidak langsung hardcode fetch API; gunakan service `getPortfolioData`.
- Open/Closed: mudah menambah section baru tanpa ubah yang lama.
- Domain Model: `src/types/portfolio.ts` memisahkan bentuk data dari implementasi fetch.
- Caching: gunakan `cache()` React server utility di service untuk konsistensi rendering.

### Migrasi ke Backend Nyata

1. Sediakan env var: `NEXT_PUBLIC_API_BASE_URL` (misal di `.env.local`).
2. Ubah `getPortfolioData` di `src/lib/portfolioService.ts`:
	 ```ts
	 export const getPortfolioData = cache(async () => {
		 const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/portfolio`, { next: { revalidate: 60 } });
		 if (!res.ok) throw new Error("Failed to load portfolio");
		 return (await res.json()) as PortfolioData;
	 });
	 ```
3. Atur policy revalidate sesuai kebutuhan (ISR / dynamic).
4. Tambah error boundary / loading UI (komponen `error.tsx` & `loading.tsx` di folder `app`).

### Menambah Proyek Baru (Dummy)

Edit `src/data/projects.ts` dan tambahkan object dengan field sesuai tipe `Project`.

### Testing & Quality (Langkah Berikutnya)

- Unit test komponen dengan Vitest / Jest (belum disetup).
- Lighthouse audit untuk performa & accessibility.
- Tambah ESLint rule custom jika perlu (sudah strict mode aktif TypeScript).

### Deployment

Dapat langsung deploy ke Vercel: `vercel` atau hubungkan repo Git. Build command default `next build`.

### Lisensi

Tambahkan lisensi jika ingin publik. Saat ini proyek pribadi.

---
Made with Next.js & TailwindCSS.
"# my-portfolio" 
