import { Request, Response } from "express";
import { errorResponse } from "../../exceptions/error";
import { eventExpenseSchema } from "../../schema/event/expense";
import { prismaClient } from "../../index";

export const create = async (req: Request, res: Response) => {
  try {
    eventExpenseSchema.parse(req.body);
  } catch (e: any) {
    return errorResponse({ res, type: "invalid", message: e?.issues });
  }

  try {
    const vendor = await prismaClient.vendor.findFirst({
      where: {
        id: Number(req.body.vendor_id),
      },
    });

    if (!vendor) {
      return errorResponse({
        res,
        type: "not found",
        message: "Vendor not found",
      });
    }

    const expense = await prismaClient.eventExpense.create({
      data: {
        event_id: req.params.event_id,
        category: req.body.category,
        expense_name: req.body.expense_name,
        quantity: req.body.quantity,
        price: req.body.price,
        notes: req.body.notes,
        vendor_id: req.body.vendor_id,
        status: req.body.status,
      },
    });

    return res.status(201).json({
      success: true,
      data: expense,
      message: "Event Expense created successfully",
    });
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const expenses = await prismaClient.eventExpense.findMany({
      where: {
        event_id: req.params.event_id,
      },
    });

    return res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

export const find = async (req: Request, res: Response) => {
  try {
    const expense = await prismaClient.eventExpense.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!expense) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event Expense not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const expense = await prismaClient.eventExpense.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!expense) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event Expense not found",
      });
    }

    const updatedExpense = await prismaClient.eventExpense.update({
      where: {
        id: req.params.id,
      },
      data: {
        category: req.body.category,
        expense_name: req.body.expense_name,
        quantity: req.body.quantity,
        price: req.body.price,
        notes: req.body.notes,
        vendor_id: req.body.vendor_id,
        status: req.body.status,
      },
    });

    return res.status(200).json({
      success: true,
      data: updatedExpense,
      message: "Event Expense updated successfully",
    });
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const expense = await prismaClient.eventExpense.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!expense) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event Expense not found",
      });
    }

    await prismaClient.eventExpense.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(204).json({});
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};
