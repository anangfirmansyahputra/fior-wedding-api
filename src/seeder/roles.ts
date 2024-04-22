// // import { prismaClient } from "../index";
// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// const permissionData = [
//   { id: 1, name: "customer.create" },
//   { id: 2, name: "customer.update" },
//   { id: 3, name: "customer.read" },
//   { id: 4, name: "customer.delete" },
//   { id: 5, name: "event.create" },
//   { id: 6, name: "event.update" },
//   { id: 7, name: "event.read" },
//   { id: 8, name: "event.delete" },
// ];

// async function main() {
//   try {
//     await prisma.role.createMany({
//       data: [
//         {
//           name: "ADMIN",
//         },
//         {
//           name: "CUSTOMER",
//         },
//       ],
//     });

//     const roles = await prisma.role.findMany({});

//     const permissions = await prisma.permission.createMany({
//       data: permissionData,
//     });

//     const rolePermissions = await prisma.rolePermission.createMany({
//       data: [
//         {
//           role_id: roles[0].id,
//           permission_id: 1,
//         },
//         {
//           role_id: roles[0].id,
//           permission_id: 2,
//         },
//         {
//           role_id: roles[0].id,
//           permission_id: 3,
//         },
//         {
//           role_id: roles[0].id,
//           permission_id: 4,
//         },
//         {
//           role_id: roles[0].id,
//           permission_id: 5,
//         },
//         {
//           role_id: roles[0].id,
//           permission_id: 6,
//         },
//         {
//           role_id: roles[0].id,
//           permission_id: 7,
//         },
//         {
//           role_id: roles[0].id,
//           permission_id: 8,
//         },
//         {
//           role_id: roles[1].id,
//           permission_id: 5,
//         },
//         {
//           role_id: roles[1].id,
//           permission_id: 6,
//         },
//         {
//           role_id: roles[1].id,
//           permission_id: 7,
//         },
//         {
//           role_id: roles[1].id,
//           permission_id: 8,
//         },
//       ],
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

// main()
//   .catch((error) => {
//     console.error("Error in seeder:", error);
//     process.exit(1); // Keluar dari proses dengan kode error
//   })
//   .finally(async () => {
//     await prisma.$disconnect(); // Tutup koneksi Prisma setelah selesai
//   });
