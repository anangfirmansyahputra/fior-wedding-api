// import { prismaClient } from "../index";
const { PrismaClient } = require("@prisma/client");
const { compareSync, hashSync } = require("bcrypt");

const prisma = new PrismaClient();

const KATOLIK = [
  {
    description: "Melakukan registrasi ke sekretariat paroki",
    note: "",
  },
  {
    description:
      "Menyerahkan Formulir pendaftaran pernikahan ke Sekretariat Paroki",
    note: "",
  },
  {
    description:
      "Mempersiapkan salinan surat baptis terbaru (biasanya berlaku 6 bulan)",
    note: "",
  },
  {
    description: "Menentukan tanggal dan memilih jam yang tersedia",
    note: "",
  },
  {
    description: "Fotokopi Sertifikat Kursus Perkawinan",
    note: "",
  },
];

async function main() {
  try {
    const checklist = await prisma.checklistHolmat.create({
      data: {
        name: "Katolik",
      },
    });

    const items = await prisma.checklistHolmatItem.createMany({
      data: KATOLIK.map((item) => ({
        name: item.description,
        note: item.note,
        checklist_holmat_id: checklist.id,
      })),
    });

    console.log("Seed Success");
  } catch (err) {
    console.log(err);
  }
}

main()
  .catch((error) => {
    console.error("Error in seeder:", error);
    process.exit(1); // Keluar dari proses dengan kode error
  })
  .finally(async () => {
    await prisma.$disconnect(); // Tutup koneksi Prisma setelah selesai
  });
