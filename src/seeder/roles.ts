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
        {
          name: "Create Event Task Timeline",
          name_code: "create_event_task_timeline",
        },
        {
          name: "Read Event Task Timeline",
          name_code: "read_event_task_timeline",
        },
        {
          name: "Update Event Task Timeline",
          name_code: "update_event_task_timeline",
        },
        {
          name: "Delete Event Task Timeline",
          name_code: "delete_event_task_timeline",
        },
        {
          name: "Create Event Task Timeline Comment",
          name_code: "create_event_task_timeline_comment",
        },
        {
          name: "Read Event Task Timeline Comment",
          name_code: "read_event_task_timeline_comment",
        },
        {
          name: "Update Event Task Timeline Comment",
          name_code: "update_event_task_timeline_comment",
        },
        {
          name: "Delete Event Task Timeline Comment",
          name_code: "delete_event_task_timeline_comment",
        },
        {
          name: "Create Event Task Timeline Attachment",
          name_code: "create_event_task_timeline_attachment",
        },
        {
          name: "Read Event Task Timeline Attachment",
          name_code: "read_event_task_timeline_attachment",
        },
        {
          name: "Update Event Task Timeline Attachment",
          name_code: "update_event_task_timeline_attachment",
        },
        {
          name: "Delete Event Task Timeline Attachment",
          name_code: "delete_event_task_timeline_attachment",
        },
        {
          name: "Create Event Guest List",
          name_code: "create_event_guest_list",
        },
        {
          name: "Read Event Guest List",
          name_code: "read_event_guest_list",
        },
        {
          name: "Update Event Guest List",
          name_code: "update_event_guest_list",
        },
        {
          name: "Delete Event Guest List",
          name_code: "delete_event_guest_list",
        },
        {
          name: "Create Event Expense",
          name_code: "create_event_expense",
        },
        {
          name: "Read Event Expense",
          name_code: "read_event_expense",
        },
        {
          name: "Update Event Expense",
          name_code: "update_event_expense",
        },
        {
          name: "Delete Event Expense",
          name_code: "delete_event_expense",
        },
        {
          name: "Create Event payment",
          name_code: "create_event_payment",
        },
        {
          name: "Read Event payment",
          name_code: "read_event_payment",
        },
        {
          name: "Update Event payment",
          name_code: "update_event_payment",
        },
        {
          name: "Delete Event payment",
          name_code: "delete_event_payment",
        },
        {
          name: "Create Vendor",
          name_code: "create_vendor",
        },
        {
          name: "Read Vendor",
          name_code: "read_vendor",
        },
        {
          name: "Update Vendor",
          name_code: "update_vendor",
        },
        {
          name: "Delete Vendor",
          name_code: "delete_vendor",
        },
        {
          name: "Read Vendor Category",
          name_code: "read_vendor_category",
        },
        {
          name: "Scrapping Vendor Category",
          name_code: "scrapping_vendor_category",
        },
        {
          name: "Scrapping Vendor",
          name_code: "scrapping_vendor",
        },
        {
          name: "Create Vendor Note",
          name_code: "create_vendor_note",
        },
        {
          name: "Read Vendor Note",
          name_code: "read_vendor_note",
        },
        {
          name: "Update Vendor Note",
          name_code: "update_vendor_note",
        },
        {
          name: "Delete Vendor Note",
          name_code: "delete_vendor_note",
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

    await prisma.rolePermission.createMany({
      data: permissions.map((permission) => ({
        role_id: customer.id,
        permission_id: permission.id,
      })),
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
