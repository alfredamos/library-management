import catchError from "http-errors";
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.model";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UserInfo } from '../models/user-info.model';
import { UserType } from "@prisma/client"

const prisma = new PrismaClient();

const loginUser = async (req: Request, res: Response) => {
  const { body: loginUser } = req;

  const userToLogin= loginUser as User;
  const {email, password} = userToLogin;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if(!user){
    throw catchError(StatusCodes.BAD_REQUEST, 'Invalid credentials');    
  }

  const hashedPassword = user.password;

  const isValid = await bcrypt.compare(password, hashedPassword);

  if (!isValid){
    throw catchError(StatusCodes.BAD_REQUEST, 'Invalid credentials');

  }

  const token = await createJsonWebToken(user.id, user.fullName, user.userType);

  const userInfo: UserInfo = {
    id: user.id,
    fullName: user.fullName,
    userType: user.userType,
    token
  }

  res.status(StatusCodes.OK).json(userInfo);

};


const signUpUser = async (req: Request, res: Response) => {
  const { body: newUser } = req;

  const userToSignUp = newUser as User;

  const email = userToSignUp.email;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if(user){
    throw catchError(StatusCodes.BAD_REQUEST, 'User already exists.');    
  }

  const hashedPassword = await bcrypt.hash(userToSignUp.password, 10);

  userToSignUp.password = hashedPassword;

  const createdUser = await prisma.user.create({
    data: {...userToSignUp},
  })

  const token = await createJsonWebToken(createdUser.id, createdUser.fullName, createdUser.userType);

  const userInfo: UserInfo = {
    id: createdUser.id,
    fullName: createdUser.fullName,
    userType: createdUser.userType,
    token
  }

  res.status(StatusCodes.CREATED).json(userInfo);

}


async function createJsonWebToken(id: string, name: string, userType: UserType){
  const token = await jwt.sign({
    id,
    name,
    userType,
  }, process.env.JSON_TOKEN_KEY!,
  {expiresIn: '1hr'},
  )

  return token
}

export { 
  loginUser, 
  signUpUser 
};
