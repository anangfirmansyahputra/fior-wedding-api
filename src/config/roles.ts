export const roles = [
  {
    name: "ADMIN",
    permissions: [
      "customer.create",
      "customer.update",
      "customer.read",
      "customer.delete",
      "event.create",
      "event.update",
      "event.read",
      "event.delete",
      "vendor.create",
    ],
  },
  {
    name: "CUSTOMER",
    permissions: ["event.create", "event.update", "event.read", "event.delete"],
  },
];

export const permissionData = [
  { id: 1, name: "customer.create" },
  { id: 2, name: "customer.update" },
  { id: 3, name: "customer.read" },
  { id: 4, name: "customer.delete" },
  { id: 5, name: "event.create" },
  { id: 6, name: "event.update" },
  { id: 7, name: "event.read" },
  { id: 8, name: "event.delete" },
];
