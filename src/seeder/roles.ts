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
          id: "e805d479-9e5f-49b6-b2f7-849b7f94db58",
          name: "Create Customer",
          name_code: "create_customer",
        },
        {
          id: "45f1dfe2-90d4-4e70-b238-d92445d7855f",
          name: "Read Customer",
          name_code: "read_customer",
        },
        {
          id: "0e905cd0-7853-44c1-bfa3-8471f738ab1d",
          name: "Update Customer",
          name_code: "update_customer",
        },
        {
          id: "498ce877-ee22-4845-babf-801b90331d38",
          name: "Delete Customer",
          name_code: "delete_customer",
        },
        {
          id: "30c8a045-3b46-4dc7-b05d-055dc45730d5",
          name: "Create Event",
          name_code: "create_event",
        },
        {
          id: "4fe9bfee-fc0f-44df-bf2a-d8f6df5a2ad3",
          name: "Read Event",
          name_code: "read_event",
        },
        {
          id: "4d26ee78-7e7c-40bc-b440-cccd1e4fb472",
          name: "Update Event",
          name_code: "update_event",
        },
        {
          id: "d9290ae9-6fb0-41b2-9bc3-7e46e52a42a1",
          name: "Delete Event",
          name_code: "delete_event",
        },
        {
          id: "a95adfe5-bd6e-4bc5-ba3d-6e203dc89b8c",
          name: "Create Customer Biodata",
          name_code: "create_customer_biodata",
        },
        {
          id: "2a243e60-2e38-49f5-988f-2cf1d2c29fc1",
          name: "Read Customer Biodata",
          name_code: "read_customer_biodata",
        },
        {
          id: "cb469fdb-6d79-40d1-87a9-7f234903dce2",
          name: "Update Customer Biodata",
          name_code: "update_customer_biodata",
        },
        {
          id: "ff4f50ae-674e-4a12-8ed7-cbb565f7b888",
          name: "Delete Customer Biodata",
          name_code: "delete_customer_biodata",
        },
        {
          id: "b1a446fb-87d8-48a9-9f29-788b85b514ad",
          name: "Create Event Biodata",
          name_code: "create_event_biodata",
        },
        {
          id: "79929a2d-8058-41a0-ae7f-9ac48cf4d2f2",
          name: "Read Event Biodata",
          name_code: "read_event_biodata",
        },
        {
          id: "e209f5c3-25e2-4d4d-9d48-5d1b3033d37a",
          name: "Update Event Biodata",
          name_code: "update_event_biodata",
        },
        {
          id: "5f76fb68-49cb-43a9-b982-4c6fe74dc289",
          name: "Delete Event Biodata",
          name_code: "delete_event_biodata",
        },
        {
          id: "4753c5d3-04a0-48b7-9b9a-8b3f129be308",
          name: "Create Event Collaborator",
          name_code: "create_event_collaborator",
        },
        {
          id: "fdd53a20-e10e-4198-a4b4-17a4e5f5b148",
          name: "Read Event Rundown",
          name_code: "read_event_rundown",
        },
        {
          id: "e89d23ac-17b1-47f1-a7ae-d6fd35b7e890",
          name: "Create Event Rundown",
          name_code: "create_event_rundown",
        },
        {
          id: "f20d57c7-cc13-4c4e-a8f8-7987a2c8aa7b",
          name: "Update Event Rundown",
          name_code: "update_event_rundown",
        },
        {
          id: "a8e2e892-4643-4148-a30f-d2b7c156b2da",
          name: "Delete Event Rundown",
          name_code: "delete_event_rundown",
        },
        {
          id: "cc3c2bf3-63cc-4ed2-8ff5-d06954e312e2",
          name: "Create Event Task Timeline",
          name_code: "create_event_task_timeline",
        },
        {
          id: "79885738-6229-42cf-a18b-18f8361cfdf1",
          name: "Read Event Task Timeline",
          name_code: "read_event_task_timeline",
        },
        {
          id: "947dbd13-c13e-4741-881e-67a01f0b7586",
          name: "Update Event Task Timeline",
          name_code: "update_event_task_timeline",
        },
        {
          id: "f14fb6e3-ff6e-47f5-b98d-5e59e26768e0",
          name: "Delete Event Task Timeline",
          name_code: "delete_event_task_timeline",
        },
        {
          id: "c797df22-6c4a-42f5-9cb1-25d56f83c0c4",
          name: "Create Event Task Timeline Comment",
          name_code: "create_event_task_timeline_comment",
        },
        {
          id: "7b208b57-8e97-4b29-956e-62c4791801ec",
          name: "Read Event Task Timeline Comment",
          name_code: "read_event_task_timeline_comment",
        },
        {
          id: "fa5f8b69-1fe4-47df-a92a-c74c6e0c26bf",
          name: "Update Event Task Timeline Comment",
          name_code: "update_event_task_timeline_comment",
        },
        {
          id: "2a803f3f-0844-42f6-af12-acee3e7e7f1d",
          name: "Delete Event Task Timeline Comment",
          name_code: "delete_event_task_timeline_comment",
        },
        {
          id: "2a803f3f-0844-42f6-af12-ac2e1e7e7f1d",
          name: "Create Event Task Timeline Attachment",
          name_code: "create_event_task_timeline_attachment",
        },
        {
          id: "25673f3f-0844-42f6-af12-ac2e1e7e7f1d",
          name: "Read Event Task Timeline Attachment",
          name_code: "read_event_task_timeline_attachment",
        },
        {
          id: "2a803f3f-0124-42f6-af12-ac2e1e7e7f1d",
          name: "Update Event Task Timeline Attachment",
          name_code: "update_event_task_timeline_attachment",
        },
        {
          id: "2a803f3f-0844-42f6-af12-ac2e1e7e7196",
          name: "Delete Event Task Timeline Attachment",
          name_code: "delete_event_task_timeline_attachment",
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
