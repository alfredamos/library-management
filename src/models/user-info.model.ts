import { UserType } from '@prisma/client';

export class UserInfo {
    id!: string;
    fullName!: string;
    userType!: UserType;
    token!: string;
}