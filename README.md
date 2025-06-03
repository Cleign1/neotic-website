# Getting Started

Project ini dibuat untuk memenuhi tugas mata kuliah Pengenalan Proyek Perangkat Lunak

Project ini dibuat oleh Kelompok 5 P3L.

Penanggung jawab development phase:

- Muhamad Ibnu Khaidar Hafiz

## Spesifikasi Project

- Next.js v15.1.7
- Payload CMS v3.2.0
- TypeScript v4.5.4
- React v19
- TailwindCSS v4.0.0
- PostgreSQL v17 via [neon.tech PostgreSQL](https://neon.tech)
- Cloudflare R2 CDN via AWS S3 Compatible SDK. [Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/)
- Node.js v22.0.0
- ESLint & Prettier for code quality

## Instalation

### Copy file example.env jadi .env

bikin copy file baru dari example.env jadi .env

```bash
cp example.env .env
```

isikan dengan data yang sesuai

contoh:

- DATABASE_URI=your-connection-string-here

jadi seperti ini:

- DATABASE_URI=postgresql://localhost:27017/your-database-name

### Install dependencies

install dengan pnpm

```bash
pnpm install
```

setelah di install, build project dengan

```bash
pnpm build
```

tunggu sebentar untuk proses build

setelah itu bisa di jalankan dengan

```bash
pnpm start
```

atau bisa di deploy ke vercel.

jika ada pertanyaan bisa langsung hubungi saya di

- email: <ibnukhaidar@gmail.com>
