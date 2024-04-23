import { Request, Response } from "express";
import expressListEndpoints from "express-list-endpoints";
import { createPermissions } from "../lib/permission";
import app from "..";

export const get = async (req: Request, res: Response) => {
  try {
    const routes = expressListEndpoints(app);
    const permissions = createPermissions(routes);

    return res.status(200).json({
      data: permissions,
    });
  } catch (err) {
    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};
