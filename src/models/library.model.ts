import { Category } from "./category.model";

export class Library {
    id?: string;
    requesterCategory?: Category.Student;   
    userId!: string;
    bookId!: string;
    dateBookOut?: Date;
    dateBookDue?: Date;
    dateBookReturn?: Date;

}