import { Request, Response } from "express";
import { prismaClient } from "../index";
import { ErrorCode, getErrorMessage } from "../lib/error-code";

export const get = async (req: Request, res: Response) => {
  try {
    const roles = await prismaClient.role.findMany({
      include: {
        permissions: {
          select: {
            permission: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
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

export const create = async (req: Request, res: Response) => {
  const { name, permissions } = req.body;

  if (!permissions || permissions.length === 0) {
    return res.status(400).json({
      success: false,
      errors: {
        error_code: ErrorCode.INVALID_INPUT,
        error_message: getErrorMessage(ErrorCode.INVALID_INPUT),
        message:
          "Permissions is required and must contain at least 1 permission",
      },
    });
  }

  if (!name) {
    return res.status(400).json({
      success: false,
      errors: {
        error_code: ErrorCode.INVALID_INPUT,
        error_message: getErrorMessage(ErrorCode.INVALID_INPUT),
        message: "Name is required",
      },
    });
  }

  try {
    const [role] = await prismaClient.$transaction([
      prismaClient.role.create({
        data: {
          name,
        },
      }),
    ]);

    const [rolePermissions] = await prismaClient.$transaction([
      prismaClient.rolePermission.createMany({
        data: req.body.permissions.map((permission: string) => ({
          role_id: role.id,
          permission_id: permission,
        })),
      }),
    ]);

    const data = await prismaClient.role.findFirst({
      where: {
        id: role.id,
      },
      include: {
        permissions: true,
      },
    });

    return res.status(201).json({
      success: true,
      data: data,
      message: "Role created successfully",
    });
  } catch (err: any) {
    console.log(err);

    return res.status(500).json({
      success: false,
      errors: {
        error_code: ErrorCode.INTERNAL_SERVER_ERROR,
        error_message: getErrorMessage(ErrorCode.INTERNAL_SERVER_ERROR),
        message: "Internal server error",
      },
    });
  }
};

export const update = async (req: Request, res: Response) => {
  // try {
  //   const routes = expressListEndpoints(app);
  //   const permissions = createPermissions(routes);
  //   const roles = await prismaClient.role.upsert({
  //     where: {
  //       name: "ADMIN",
  //     },
  //     create: {
  //       name: "ADMIN",
  //       permissions,
  //     },
  //     update: {
  //       name: "ADMIN",
  //       permissions,
  //     },
  //   });
  //   const roleCustomer = await prismaClient.role.upsert({
  //     where: {
  //       name: "CUSTOMER",
  //     },
  //     update: {
  //       name: "CUSTOMER",
  //       permissions: [
  //         "events.post",
  //         "events.get",
  //         "events.delete",
  //         "events.patch",
  //         "auth.me.get",
  //         "auth.me.patch",
  //       ],
  //     },
  //     create: {
  //       name: "CUSTOMER",
  //       permissions: [
  //         "events.post",
  //         "events.get",
  //         "events.delete",
  //         "events.patch",
  //         "auth.me.get",
  //         "auth.me.patch",
  //       ],
  //     },
  //   });
  //   return res.status(200).json({
  //     data: [roles, roleCustomer],
  //   });
  // } catch (err: any) {
  //   return res.status(500).json({
  //     errors: {
  //       message: "Internal server error",
  //     },
  //   });
  // }
};
