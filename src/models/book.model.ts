import { Author } from "./author.model";

export class Book {
  id?: string;
  isbn!: string;
  title!: string;
  publisher!: string;
  volume!: string;
  edition!: string;
  authorId?: string;
  category!: string;
  quantity: number = 1;
  dateOfPublication: Date = new Date();
}
