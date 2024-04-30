import { EventCollaborator } from "@prisma/client";
import { errorResponse } from "../exceptions/error";
import { Response } from "express";

export function createPagination(
  page: number,
  pageSize: number,
  totalCount: number
) {
  const offset = (page - 1) * pageSize;

  const hasNextPage = page * pageSize < totalCount;
  const hasPreviousPage = page > 1;

  let nextPage = null;
  if (hasNextPage) {
    nextPage = page + 1;
  }

  let previousPage = null;
  if (hasPreviousPage) {
    previousPage = page - 1;
  }

  return {
    limit: pageSize,
    next_page: nextPage,
    previous_age: previousPage,
    current_page: page,
    total: totalCount,
  };
}

export function isCollaborator(res: Response, user: any, eventId: string) {
  const eventCollaborators: EventCollaborator[] = user.event_collaborators;

  const isCollaborator = eventCollaborators.find(
    (colaborator) => colaborator.event_id === eventId
  );

  const isAdmin = user.role.name === "Super Admin";

  if (!isCollaborator && !isAdmin) {
    return false;
  } else {
    return true;
  }
}
