# 🚀 Portfolio Website

Portfolio website modern yang dibangun dengan Next.js 14, TypeScript, dan Tailwind CSS. Menampilkan proyek, skills, pengalaman, dan blog dengan animasi smooth dan dark mode support.

## ✨ Fitur

- 🎨 **Design Modern** - UI yang clean dengan gradient backgrounds dan animasi halus
- 🌓 **Dark Mode** - Automatic dark mode berdasarkan system preference
- 📱 **Fully Responsive** - Tampil sempurna di semua device dari mobile hingga desktop
- ⚡ **Performance Optimized** - Image optimization, code splitting, dan lazy loading
- 🎭 **Animasi Interaktif** - Fade-in, slide-up, dan hover effects yang smooth
- 📊 **Skills Showcase** - Skills dikelompokkan berdasarkan kategori
- 💼 **Experience Timeline** - Tampilan pengalaman kerja yang informatif
- 📝 **Blog Section** - Platform untuk sharing catatan teknis
- 🔍 **SEO Friendly** - Metadata dan struktur yang optimal untuk search engines
- 📄 **Project Details** - Halaman individual untuk setiap proyek dengan info lengkap

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Deployment**: Vercel (recommended)
- **Font**: Geist Sans & Geist Mono

## 📦 Installation

```bash
# Clone repository
git clone <your-repo-url>
cd portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 🎨 Customization

### 1. Data Portfolio (`src/lib/portfolioService.ts`)

Update informasi personal Anda:

```typescript
owner: {
  name: "Nama Anda",
  role: "Full-Stack Developer",
  location: "Indonesia",
  summary: "Your tagline here",
  bio: "Your story here",
  avatarUrl: "/avatar.jpg",
  email: "your@email.com",
  github: "https://github.com/yourusername",
  linkedin: "https://www.linkedin.com/in/yourusername",
}
```

### 2. Projects (`src/data/projects.ts`)

Tambahkan atau edit proyek Anda:

```typescript
{
  id: "unique-id",
  name: "Project Name",
  description: "Short description",
  longDescription: "Detailed description",
  techStack: ["Tech1", "Tech2"],
  repoUrl: "github-url",
  liveUrl: "demo-url",
  year: 2024,
  featured: true,
  challenges: ["Challenge 1", "Challenge 2"],
  solutions: ["Solution 1", "Solution 2"],
  architecture: "Architecture description"
}
```

### 3. Skills

Update skills di `portfolioService.ts` dengan kategori:
- `language` - Bahasa pemrograman
- `framework` - Framework & libraries
- `tool` - Tools & platforms
- `database` - Database systems

### 4. Avatar

Letakkan foto Anda di `public/avatar.jpg` atau update path di `portfolioService.ts`.

### 5. Colors & Theme

Edit `src/app/globals.css` untuk mengubah color scheme:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout dengan metadata
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles & animations
│   └── projects/[id]/      # Dynamic project pages
├── components/
│   ├── Hero.tsx            # Hero section dengan avatar
│   ├── AboutSection.tsx    # About section
│   ├── SkillsSection.tsx   # Skills dengan kategori
│   ├── ProjectsSection.tsx # Projects showcase
│   ├── ProjectCard.tsx     # Project card component
│   ├── ExperienceSection.tsx # Work experience
│   ├── BlogSection.tsx     # Blog posts
│   └── ContactSection.tsx  # Contact info
├── data/
│   └── projects.ts         # Projects data
├── lib/
│   └── portfolioService.ts # Data service layer
└── types/
    └── portfolio.ts        # TypeScript interfaces
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Deploy otomatis setiap push

### Manual Build

```bash
npm run build
npm start
```

## 📝 Content Tips

### Hero Section
- Nama yang jelas dan menonjol
- Tagline yang memorable (1-2 kalimat)
- CTA buttons yang clear

### About Section
- Cerita personal yang relatable
- Filosofi kerja yang unik
- Pendekatan development Anda

### Projects
- **Description**: Singkat dan jelas (1-2 kalimat)
- **Long Description**: Context dan overview
- **Challenges**: Masalah teknis yang dihadapi
- **Solutions**: Bagaimana Anda solve masalahnya
- **Architecture**: Tech stack dan design decisions

### Blog Posts
- Judul yang catchy
- Excerpt yang engaging
- Tags yang relevant

## 🎯 Performance Tips

- ✅ Images dioptimasi dengan Next.js Image component
- ✅ Code splitting automatic dengan App Router
- ✅ Lazy loading untuk components di bawah fold
- ✅ CSS animations dengan hardware acceleration
- ✅ Minimal bundle size dengan tree shaking

## 🐛 Troubleshooting

**Build errors:**
```bash
# Clear cache dan rebuild
rm -rf .next node_modules
npm install
npm run build
```

**Type errors:**
- Pastikan semua interfaces di `types/portfolio.ts` match dengan data
- Run `npm run lint` untuk check errors

## 📄 License

Free to use for your personal portfolio. Attribution appreciated but not required.

## 🤝 Contributing

Feel free to fork, customize, dan share improvements!

---

Dibuat dengan ❤️ menggunakan Next.js
