// import { prismaClient } from "../index";
const { PrismaClient } = require("@prisma/client");
const { compareSync, hashSync } = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.user.deleteMany();
    await prisma.role.deleteMany();
    await prisma.permission.deleteMany();

    const createPermissions = await prisma.permission.createMany({
      data: [
        {
          name: "Read Customer",
          name_code: "read_customer",
        },
        {
          name: "Update Customer",
          name_code: "update_customer",
        },
        {
          name: "Delete Customer",
          name_code: "delete_customer",
        },
        {
          name: "Create Event",
          name_code: "create_event",
        },
        {
          name: "Read Event",
          name_code: "read_event",
        },
        {
          name: "Update Event",
          name_code: "update_event",
        },
        {
          name: "Delete Event",
          name_code: "delete_event",
        },
      ],
    });

    const permissions = await prisma.permission.findMany({});

    const role = await prisma.role.create({
      data: {
        name: "Super Admin",
      },
    });

    const rolePermission = await prisma.rolePermission.createMany({
      data: permissions.map((permission) => ({
        role_id: role.id,
        permission_id: permission.id,
      })),
    });

    const user = await prisma.user.create({
      data: {
        username: "admin123",
        password: hashSync("rahasia", 10),
        name: "Admin",
        role_id: role.id,
      },
    });

    return console.log(user);
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
