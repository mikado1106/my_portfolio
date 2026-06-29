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
        "Led a community of 40+ members, running weekly planning and check-in meetings",
        "Organized major events and managed operational logistics for the youth group",
        "Mentored new members and helped them integrate into community programs",
      ],
      tags: ["Leadership", "Team Collaboration", "Public Speaking"],
    },
    {
      role: "Member",
      name: "Faculty Open House",
      period: "Jul 2024 – Aug 2024",
      items: [
        "Managed entrance and crowd flow for an event with 60+ attendees",
        "Coordinated with committee members to maintain orderly activity flow",
        "Ensured zero incidents through clear communication and area monitoring",
      ],
      tags: ["Problem Solving", "Team Collaboration", "Adaptability"],
    },
    {
      role: "Leader",
      name: "Rover Scout Council",
      period: "Jan 2021 – Jan 2022",
      items: [
        "Led administrative and program planning for the scout council",
        "Managed yearly programs with a team of 15 peers",
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
        "Memimpin komunitas dengan 40+ anggota, menjalankan rapat perencanaan dan evaluasi mingguan",
        "Mengorganisasi acara besar dan mengelola logistik operasional grup pemuda",
        "Membimbing anggota baru dan membantu mereka beradaptasi dalam program komunitas",
      ],
      tags: ["Kepemimpinan", "Kolaborasi Tim", "Public Speaking"],
    },
    {
      role: "Anggota",
      name: "Faculty Open House",
      period: "Jul 2024 – Agu 2024",
      items: [
        "Mengatur pintu masuk dan alur kerumunan untuk acara dengan 60+ peserta",
        "Berkoordinasi dengan anggota panitia untuk menjaga kelancaran aktivitas acara",
        "Memastikan nol insiden melalui komunikasi yang jelas dan pemantauan area",
      ],
      tags: ["Pemecahan Masalah", "Kolaborasi Tim", "Adaptabilitas"],
    },
    {
      role: "Ketua",
      name: "Dewan Pramuka Penegak",
      period: "Jan 2021 – Jan 2022",
      items: [
        "Memimpin administrasi dan perencanaan program untuk dewan pramuka",
        "Mengelola program tahunan bersama tim yang terdiri dari 15 rekan",
      ],
      tags: ["Kepemimpinan", "Perencanaan Strategis", "Administrasi"],
    },
  ]
};
