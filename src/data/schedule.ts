export type SesiTipe = 'kuliah' | 'asistensi';

export interface Sesi {
  hari: Hari;
  mulai: string; // "HH:MM"
  selesai: string; // "HH:MM"
  ruang: string;
  mataKuliah: string;
  kelas: string;
  kode?: string;
  tipe: SesiTipe;
}

export const HARI = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'] as const;
export type Hari = (typeof HARI)[number];

/**
 * Sumber kebenaran jadwal.
 * - `kuliah`  : kelas milik sendiri (PS1SI-08-REG-01), transkrip dari referensi/jadwal.jpeg
 * - `asistensi`: sesi asistensi praktikum untuk kelas lain
 */
export const jadwal: Sesi[] = [
  // ── Senin ────────────────────────────────────────────────
  {
    hari: 'Senin',
    mulai: '07:30',
    selesai: '10:30',
    ruang: 'Lab Jarkom',
    mataKuliah: 'Sistem Operasi',
    kelas: 'PS1SI-09-REG02',
    tipe: 'asistensi',
  },
  {
    hari: 'Senin',
    mulai: '10:30',
    selesai: '13:30',
    ruang: 'DC-302',
    mataKuliah: 'Arsitektur Enterprise',
    kelas: 'PS1SI-08-REG-01',
    kode: 'BBK3AAB3',
    tipe: 'kuliah',
  },
  {
    hari: 'Senin',
    mulai: '14:30',
    selesai: '17:30',
    ruang: 'Lab Data',
    mataKuliah: 'Pengembangan Aplikasi Website',
    kelas: 'PS1SI-09-REG01',
    tipe: 'asistensi',
  },

  // ── Selasa ───────────────────────────────────────────────
  {
    hari: 'Selasa',
    mulai: '07:30',
    selesai: '10:30',
    ruang: 'REK-203',
    mataKuliah: 'Manajemen Data Enterprise',
    kelas: 'PS1SI-08-REG-01',
    kode: 'BBK3DAB3',
    tipe: 'kuliah',
  },
  {
    hari: 'Selasa',
    mulai: '10:30',
    selesai: '13:30',
    ruang: 'DC-204',
    mataKuliah: 'Data Warehouse dan Business Intelligence',
    kelas: 'PS1SI-08-REG-01',
    kode: 'BBK3BAB3',
    tipe: 'kuliah',
  },
  {
    hari: 'Selasa',
    mulai: '13:30',
    selesai: '16:30',
    ruang: 'Lab Jarkom',
    mataKuliah: 'Sistem Enterprise',
    kelas: 'PS1SI-10-REG01',
    tipe: 'asistensi',
  },

  // ── Rabu ─────────────────────────────────────────────────
  {
    hari: 'Rabu',
    mulai: '07:30',
    selesai: '10:30',
    ruang: 'REK-204',
    mataKuliah: 'Proyek Perangkat Lunak',
    kelas: 'PS1SI-08-REG-01',
    kode: 'BBK3EAB3',
    tipe: 'kuliah',
  },
  {
    hari: 'Rabu',
    mulai: '10:30',
    selesai: '14:30',
    ruang: 'Lab Jarkom',
    mataKuliah: 'Algoritma dan Pemrograman',
    kelas: 'PS1SI-10-REG04',
    tipe: 'asistensi',
  },
  {
    hari: 'Rabu',
    mulai: '14:30',
    selesai: '17:30',
    ruang: 'Lab Jarkom',
    mataKuliah: 'Sistem Operasi',
    kelas: 'PS1SI-09-REG04',
    tipe: 'asistensi',
  },

  // ── Kamis ────────────────────────────────────────────────
  {
    hari: 'Kamis',
    mulai: '07:30',
    selesai: '09:30',
    ruang: 'REK-203',
    mataKuliah: 'Bahasa Inggris',
    kelas: 'PS1SI-08-REG-01',
    kode: 'UCKXADB2',
    tipe: 'kuliah',
  },
  {
    hari: 'Kamis',
    mulai: '10:30',
    selesai: '13:30',
    ruang: 'L-DATA',
    mataKuliah: 'Komputasi Awan',
    kelas: 'PS1SI-08-REG-01',
    kode: 'BBK3CAB3',
    tipe: 'kuliah',
  },

  // ── Jumat ────────────────────────────────────────────────
  {
    hari: 'Jumat',
    mulai: '12:30',
    selesai: '15:30',
    ruang: 'L-JARKOM',
    mataKuliah: 'Sistem Informasi Akuntansi',
    kelas: 'PS1SI-08-REG-01',
    kode: 'BBK3FAB3',
    tipe: 'kuliah',
  },
];

/** Ubah "HH:MM" menjadi menit sejak tengah malam. */
export function menitDari(hhmm: string): number {
  const [j, m] = hhmm.split(':').map(Number);
  return j * 60 + m;
}

/** Durasi sesi dalam menit. */
export function durasiMenit(sesi: Sesi): number {
  return menitDari(sesi.selesai) - menitDari(sesi.mulai);
}

// Rentang sumbu waktu grid mingguan (07:00 – 17:30).
export const SLOT_MULAI = menitDari('07:00');
export const SLOT_SELESAI = menitDari('17:30');
export const SLOT_MENIT = 30; // tinggi 1 baris grid
export const TOTAL_SLOT = (SLOT_SELESAI - SLOT_MULAI) / SLOT_MENIT;

/** Jam-jam patokan untuk label sumbu waktu (per 1 jam). */
export const JAM_LABEL: string[] = (() => {
  const out: string[] = [];
  for (let t = SLOT_MULAI; t <= SLOT_SELESAI; t += 60) {
    out.push(`${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`);
  }
  return out;
})();

/** Sesi pada satu hari, terurut berdasarkan jam mulai. */
export function sesiPerHari(hari: Hari): Sesi[] {
  return jadwal
    .filter((s) => s.hari === hari)
    .sort((a, b) => menitDari(a.mulai) - menitDari(b.mulai));
}

export const TOTAL_SESI = jadwal.length;

export const LABEL_TIPE: Record<SesiTipe, string> = {
  kuliah: 'Kuliah',
  asistensi: 'Asistensi',
};

/** Nama hari lengkap, urutan mengikuti `Date#getDay()` (0 = Minggu). */
export const HARI_PENUH = [
  'Minggu',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
] as const;

export function hariKerja(nama: string): nama is Hari {
  return (HARI as readonly string[]).includes(nama);
}

/** Kunci stabil untuk satu sesi (satu hari kerja tidak punya dua sesi mulai jam sama). */
export function idSesi(sesi: Sesi): string {
  return `${sesi.hari}-${sesi.mulai}`;
}

export type StatusTipe = 'berlangsung' | 'menunggu' | 'kosong';

export interface StatusJadwal {
  status: StatusTipe;
  sesi: Sesi | null;
  /** 'berlangsung': menit sampai selesai. 'menunggu': menit sampai mulai (bisa lintas hari). */
  menit: number;
}

/** Status jadwal pada waktu tertentu (default: sekarang), mencakup kuliah & asistensi. */
export function statusSaatIni(sekarang: Date = new Date()): StatusJadwal {
  const menitSekarang = sekarang.getHours() * 60 + sekarang.getMinutes();
  const namaHariIni = HARI_PENUH[sekarang.getDay()];

  if (hariKerja(namaHariIni)) {
    const sesiHariIni = sesiPerHari(namaHariIni);
    const aktif = sesiHariIni.find(
      (s) => menitDari(s.mulai) <= menitSekarang && menitSekarang < menitDari(s.selesai),
    );
    if (aktif) {
      return { status: 'berlangsung', sesi: aktif, menit: menitDari(aktif.selesai) - menitSekarang };
    }

    const berikutnya = sesiHariIni.find((s) => menitDari(s.mulai) > menitSekarang);
    if (berikutnya) {
      return { status: 'menunggu', sesi: berikutnya, menit: menitDari(berikutnya.mulai) - menitSekarang };
    }
  }

  for (let tambah = 1; tambah <= 7; tambah++) {
    const nama = HARI_PENUH[(sekarang.getDay() + tambah) % 7];
    if (!hariKerja(nama)) continue;
    const [pertama] = sesiPerHari(nama);
    if (pertama) {
      return {
        status: 'menunggu',
        sesi: pertama,
        menit: tambah * 1440 - menitSekarang + menitDari(pertama.mulai),
      };
    }
  }

  return { status: 'kosong', sesi: null, menit: 0 };
}

/** Format menit menjadi "X menit" / "X jam" / "X jam Y menit". */
export function formatDurasi(totalMenit: number): string {
  const menit = Math.max(0, Math.round(totalMenit));
  const jam = Math.floor(menit / 60);
  const sisa = menit % 60;
  if (jam === 0) return `${sisa} menit`;
  if (sisa === 0) return `${jam} jam`;
  return `${jam} jam ${sisa} menit`;
}

/** Frasa hitung mundur untuk status 'menunggu', sadar-hari untuk sesi bukan hari ini. */
export function formatMenunggu(status: StatusJadwal, sekarang: Date = new Date()): string {
  if (status.status !== 'menunggu' || !status.sesi) return '';
  const namaHariIni = HARI_PENUH[sekarang.getDay()];
  if (status.sesi.hari === namaHariIni) {
    return `dalam ${formatDurasi(status.menit)}`;
  }
  const hari = Math.floor(status.menit / 1440);
  const sisaMenit = status.menit % 1440;
  const labelHari = hari === 1 ? '1 hari' : `${hari} hari`;
  const sisaTeks = sisaMenit > 0 ? ` ${formatDurasi(sisaMenit)}` : '';
  return `${status.sesi.hari}, dalam ${labelHari}${sisaTeks}`;
}
