// import { prismaClient } from "../index";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const permissionData = [
  { id: 1, name: "customer.create" },
  { id: 2, name: "customer.update" },
  { id: 3, name: "customer.read" },
  { id: 4, name: "customer.delete" },
  { id: 5, name: "event.create" },
  { id: 6, name: "event.update" },
  { id: 7, name: "event.read" },
  { id: 8, name: "event.delete" },
];

async function main() {
  try {
    await prisma.role.createMany({
      data: [
        {
          name: "ADMIN",
          permissions: [
            "create_customer",
            "read_customer",
            "update_record",
            "delete_record",
            "create_event",
            "read_event",
            "update_event",
            "delete_event",
            "create_customer_biodata",
            "read_customer_biodata",
            "update_customer_biodata",
            "delete_customer_biodata",
          ],
        },
        {
          name: "CUSTOMER",
          permissions: [
            "create_event",
            "read_event",
            "update_event",
            "delete_event",
          ],
        },
      ],
    });

    console.log("Seed role success");
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
