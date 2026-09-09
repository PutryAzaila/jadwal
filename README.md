# Jadwal Kuliah & Asistensi — Semester Ganjil 2025/2026

Halaman jadwal pribadi (Siska Yulianti · PS1SI-08-REG-01), tema pink modern,
responsif. Dibuat dengan **Astro + Tailwind CSS v4**.

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:4321
```

Perintah lain:

```bash
npm run build      # output statis ke dist/
npm run preview    # pratinjau hasil build
npx astro check    # pemeriksaan tipe
```

## Struktur

| Berkas | Isi |
|---|---|
| `src/data/schedule.ts` | Sumber kebenaran seluruh sesi + helper waktu/grid |
| `src/components/WeekGrid.astro` | Tampilan kisi mingguan (≥ md) |
| `src/components/AgendaList.astro` | Tampilan agenda per hari (mobile) |
| `src/components/SessionCard.astro` | Kartu satu sesi |
| `src/components/Legend.astro` | Keterangan Kuliah vs Asistensi |
| `src/pages/index.astro` | Halaman + pengalih tampilan + penanda "hari ini" |
| `src/styles/global.css` | Token warna pink, font, tinggi baris grid |

Mengubah jadwal: sunting array `jadwal` di `src/data/schedule.ts`. Rentang jam
sumbu waktu diatur lewat `SLOT_MULAI` / `SLOT_SELESAI` di berkas yang sama.

## Sumber data

Kelas `kuliah` ditranskrip dari jadwal iGracias (`referensi/jadwal.jpeg`);
sesi `asistensi` praktikum ditambahkan manual.
