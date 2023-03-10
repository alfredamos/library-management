import { UserType } from "./user-type.model";

export class User {
    id?: string;
    fullName!: string;
    email!: string;
    phone!: string;
    password!: string;
    newPassword?: string;
    departmentId!: string;
    userType!: UserType;
}