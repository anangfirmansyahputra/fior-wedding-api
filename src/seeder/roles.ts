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
          name: "Create Customer",
          name_code: "create_customer",
        },
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
        {
          name: "Create Customer Biodata",
          name_code: "create_customer_biodata",
        },
        {
          name: "Read Customer Biodata",
          name_code: "read_customer_biodata",
        },
        {
          name: "Update Customer Biodata",
          name_code: "update_customer_biodata",
        },
        {
          name: "Delete Customer Biodata",
          name_code: "delete_customer_biodata",
        },
        {
          name: "Create Event Biodata",
          name_code: "create_event_biodata",
        },
        {
          name: "Read Event Biodata",
          name_code: "read_event_biodata",
        },
        {
          name: "Update Event Biodata",
          name_code: "update_event_biodata",
        },
        {
          name: "Delete Event Biodata",
          name_code: "delete_event_biodata",
        },
        {
          name: "Create Event Collaborator",
          name_code: "create_event_collaborator",
        },
        {
          name: "Read Event Rundown",
          name_code: "read_event_rundown",
        },
        {
          name: "Create Event Rundown",
          name_code: "create_event_rundown",
        },
        {
          name: "Update Event Rundown",
          name_code: "update_event_rundown",
        },
        {
          name: "Delete Event Rundown",
          name_code: "delete_event_rundown",
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

    const customer = await prisma.role.create({
      data: {
        name: "Customer",
      },
    });

    const p = await prisma.permission.findFirst({
      where: {
        name_code: "read_customer",
      },
    });

    const per = await prisma.rolePermission.create({
      data: {
        role_id: customer.id,
        permission_id: p.id,
      },
    });

    await prisma.user.create({
      data: {
        username: "customer123",
        password: hashSync("rahasia", 10),
        name: "Customer",
        role_id: customer.id,
      },
    });

    return console.log("Seeder successfully created");
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
