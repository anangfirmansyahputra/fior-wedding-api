import { Request, Response } from "express";
import app, { prismaClient } from "../index";
import expressListEndpoints from "express-list-endpoints";
import { createPermissions } from "../lib/permission";

export const get = async (req: Request, res: Response) => {
  try {
    const roles = await prismaClient.role.findMany({});

    return res.status(200).json({
      data: roles,
    });
  } catch (err) {
    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const routes = expressListEndpoints(app);

    const permissions = createPermissions(routes);

    const roles = await prismaClient.role.upsert({
      where: {
        name: "ADMIN",
      },
      create: {
        name: "ADMIN",
        permissions,
      },
      update: {
        name: "ADMIN",
        permissions,
      },
    });

    const roleCustomer = await prismaClient.role.upsert({
      where: {
        name: "CUSTOMER",
      },
      update: {
        name: "CUSTOMER",
        permissions: [
          "events.post",
          "events.get",
          "events.delete",
          "events.patch",
          "auth.me.get",
          "auth.me.patch",
        ],
      },
      create: {
        name: "CUSTOMER",
        permissions: [
          "events.post",
          "events.get",
          "events.delete",
          "events.patch",
          "auth.me.get",
          "auth.me.patch",
        ],
      },
    });

    return res.status(200).json({
      data: [roles, roleCustomer],
    });
  } catch (err: any) {
    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};
