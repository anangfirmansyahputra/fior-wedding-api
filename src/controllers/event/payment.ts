import { json, Request, Response } from "express";
import { errorResponse } from "../../exceptions/error";
import { eventPaymentSchema } from "../../schema/event/payment";
import { prismaClient } from "../../index";

export const create = async (req: Request, res: Response) => {
  try {
    eventPaymentSchema.parse(req.body);
  } catch (e: any) {
    return errorResponse({ res, type: "invalid", message: e?.issues });
  }

  try {
    const expense = await prismaClient.eventExpense.findFirst({
      where: {
        id: req.params.expense_id,
      },
    });

    if (!expense) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event expense not found",
      });
    }
    const payment = await prismaClient.eventPayment.create({
      data: {
        event_id: req.params.event_id,
        expense_id: expense.id,
        expense_name: expense.expense_name,
        vendor_name: req.body.vendor_name,
        price: req.body.price,
        amount_paid: req.body.amount_paid,
      },
    });

    return res.status(201).json({
      success: true,
      data: payment,
    });
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const expense = await prismaClient.eventExpense.findFirst({
      where: {
        id: req.params.expense_id,
      },
    });

    if (!expense) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event expense not found",
      });
    }

    const payments = await prismaClient.eventPayment.findMany({
      where: {
        event_id: req.params.event_id,
        expense_id: expense.id,
      },
    });

    return res.status(200).json({
      success: true,
      data: payments,
    });
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

export const find = async (req: Request, res: Response) => {
  try {
    const expense = await prismaClient.eventExpense.findFirst({
      where: {
        id: req.params.expense_id,
      },
    });

    if (!expense) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event expense not found",
      });
    }

    const payment = await prismaClient.eventPayment.findFirst({
      where: {
        id: req.params.id,
        event_id: req.params.event_id,
        expense_id: expense.id,
      },
    });

    if (!payment) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event payment not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    eventPaymentSchema.parse(req.body);
  } catch (e: any) {
    return errorResponse({ res, type: "invalid", message: e?.issues });
  }

  try {
    const expense = await prismaClient.eventExpense.findFirst({
      where: {
        id: req.params.expense_id,
      },
    });

    if (!expense) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event expense not found",
      });
    }

    const payment = await prismaClient.eventPayment.findFirst({
      where: {
        id: req.params.id,
        event_id: req.params.event_id,
        expense_id: expense.id,
      },
    });

    if (!payment) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event payment not found",
      });
    }

    const update = await prismaClient.eventPayment.update({
      where: {
        id: req.params.id,
        event_id: req.params.event_id,
        expense_id: expense.id,
      },
      data: {
        event_id: req.params.event_id,
        expense_id: expense.id,
        expense_name: expense.expense_name,
        vendor_name: req.body.vendor_name,
        price: req.body.price,
        amount_paid: req.body.amount_paid,
      },
    });

    return res.status(200).json({
      success: true,
      data: update,
    });
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const expense = await prismaClient.eventExpense.findFirst({
      where: {
        id: req.params.expense_id,
      },
    });

    if (!expense) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event expense not found",
      });
    }

    const payment = await prismaClient.eventPayment.findFirst({
      where: {
        id: req.params.id,
        event_id: req.params.event_id,
        expense_id: expense.id,
      },
    });

    if (!payment) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event payment not found",
      });
    }

    await prismaClient.eventPayment.delete({
      where: {
        id: req.params.id,
        event_id: req.params.event_id,
        expense_id: expense.id,
      },
    });

    return res.status(204).json({});
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};
