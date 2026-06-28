export interface Organization {
  role: string;
  name: string;
  period: string;
  items: string[];
  tags: string[];
}

export const organizations: Record<"en" | "id", Organization[]> = {
  en: [
    {
      role: "Leader",
      name: "NHKBP Cililitan (Youth Association)",
      period: "Jul 2024 – Present",
      items: [
        "Led a community of 40+ members and organized weekly operational meetings",
        "Monitored youth engagement strategies, resulting in a 20% increase in participation year-over-year",
        "Coordinated major events and managed operational logistics for the youth group",
        "Mentored new members to facilitate their integration into the community",
      ],
      tags: ["Leadership", "Team Collaboration", "Public Speaking"],
    },
    {
      role: "Member",
      name: "Faculty Open House",
      period: "Jul 2024 – Aug 2024",
      items: [
        "Orchestrated security protocols and crowd flow for 60+ attendees",
        "Monitored safety risks and implemented proactive management to achieve zero incidents",
        "Mitigated potential risks through proactive incident response planning",
        "Coordinated with committee members to ensure an orderly flow of event activities",
      ],
      tags: ["Problem Solving", "Team Collaboration", "Adaptability"],
    },
    {
      role: "Leader",
      name: "Rover Scout Council",
      period: "Jan 2021 – Jan 2022",
      items: [
        "Directed strategic planning and administrative operations for the scout council",
        "Managed organizational administrative tasks and coordinated strategic planning for scout activities",
        "Monitored the execution of yearly programs led by a team of 15 peers",
      ],
      tags: ["Leadership", "Strategic Planning", "Administration"],
    },
  ],
  id: [
    {
      role: "Ketua",
      name: "Pemuda NHKBP Cililitan",
      period: "Jul 2024 – Sekarang",
      items: [
        "Memimpin komunitas dengan 40+ anggota dan mengadakan rapat operasional mingguan",
        "Mengevaluasi strategi keterlibatan pemuda yang berdampak pada peningkatan partisipasi sebesar 20% per tahun",
        "Mengoordinasikan acara besar dan mengelola logistik operasional untuk grup pemuda",
        "Membimbing anggota baru untuk beradaptasi dan berpartisipasi aktif dalam program",
      ],
      tags: ["Kepemimpinan", "Kolaborasi Tim", "Public Speaking"],
    },
    {
      role: "Anggota",
      name: "Faculty Open House",
      period: "Jul 2024 – Agu 2024",
      items: [
        "Mengatur protokol keamanan dan alur kerumunan untuk 60+ peserta",
        "Memantau risiko keselamatan dan menerapkan manajemen proaktif untuk mencapai nol insiden",
        "Memitigasi potensi risiko melalui perencanaan respons insiden secara proaktif",
        "Berkoordinasi dengan anggota panitia untuk memastikan kelancaran aktivitas acara",
      ],
      tags: ["Pemecahan Masalah", "Kolaborasi Tim", "Adaptabilitas"],
    },
    {
      role: "Ketua",
      name: "Dewan Pramuka Penegak",
      period: "Jan 2021 – Jan 2022",
      items: [
        "Mengarahkan perencanaan strategis dan operasi administratif untuk dewan pramuka",
        "Mengelola tugas administratif organisasi dan mengoordinasikan perencanaan strategis kegiatan",
        "Memantau pelaksanaan program tahunan yang dijalankan oleh tim yang terdiri dari 15 rekan",
      ],
      tags: ["Kepemimpinan", "Perencanaan Strategis", "Administrasi"],
    },
  ]
};
