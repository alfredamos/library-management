import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import { Response, Request, NextFunction } from "express";
import { UserType, PrismaClient } from "@prisma/client";
import {UuidTool} from "uuid-tool";

import { UserInfo } from "../models/user-info.model";

const prisma = new PrismaClient();

export const checKCanLibraryModify = async(req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;

    const userInfo: UserInfo = req['user'];

    if (!id){
        next(catchError(
          StatusCodes.BAD_REQUEST,
          "This book order does not exist."
        ));
        return;
    }

    const library = await prisma.library.findUnique({
        where: {id},
    })

    if (!library) {
      next(catchError(
        StatusCodes.BAD_REQUEST,
        "This book order does not exist."
      ));
      return;
    }

    const userId = library?.userId;

    const isValid = UuidTool.compare(userInfo.id, userId);

    if (isValid || userInfo.userType === UserType.Admin){
        next();
        return;
    }else{
         next(
           catchError(
             StatusCodes.UNAUTHORIZED,
             "You are not authorized to perform this task."
           )
         );

         return;
    }


}