import { Request, Response } from "express";
import app, { prismaClient } from "../index";
import expressListEndpoints from "express-list-endpoints";

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

    function createPermissions(routes: any) {
      const permissionsSet = new Set();

      routes.forEach((route: any) => {
        const { path, methods } = route;
        const pathSegments = path
          .split("/")
          .filter((segment: any) => segment !== "");

        let objectName = "";

        pathSegments.forEach((segment: any) => {
          if (!segment.startsWith(":")) {
            objectName += `${segment}.`;
          }
        });

        objectName = objectName.slice(0, -1);

        methods.forEach((method: any) => {
          const actionName = method.toLowerCase();
          const permissionName = `${objectName}.${actionName}`;

          permissionsSet.add(permissionName);
        });
      });

      const permissions = Array.from(permissionsSet);

      const formattedPermissions = permissions.map((permission: any) =>
        permission.replace(/^api\./, "")
      );

      return formattedPermissions;
    }

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
