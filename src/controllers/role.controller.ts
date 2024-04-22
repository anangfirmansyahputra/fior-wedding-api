import { Request, Response } from "express";
import { prismaClient } from "../index";

export const get = async (req: Request, res: Response) => {
  try {
    const roles = await prismaClient.role.findMany({
      include: {
        role_permissions: true,
      },
    });

    const rolesPermissions = await prismaClient.rolePermission.findMany({
      include: {
        permission: true,
      },
    });

    const formatPermissons = rolesPermissions.map((role) => ({
      id: role.role_id,
      name: role.permission.name,
    }));

    const formatRoles = roles.map((r) => {
      const format = formatPermissons.filter((role) => role.id === r.id);

      return {
        id: r.id,
        name: r.name,
        permissions: format.map((n) => n.name),
      };
    });

    return res.status(200).json({
      data: formatRoles,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};
