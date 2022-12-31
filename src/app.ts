import express from "express";
require("express-async-errors");
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import authorRoute from "./routes/author.route";
import bookRoute from "./routes/book.route";
import departmentRoute from "./routes/department.route";
import libraryRoute from "./routes/library.route";
import userRoute from "./routes/user.route";

import { notFoundRouteMiddleware } from "./middleware/not-found-route.middleware";
import { errorHandlerMiddleware } from "./middleware/error-handler.middleware";

const app = express();

const Port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/authors", authorRoute);
app.use("/api/books", bookRoute);
app.use("/api/departments", departmentRoute);
app.use("/api/libraries", libraryRoute);
app.use("/api/users", userRoute);

app.all('*', notFoundRouteMiddleware);
app.use(errorHandlerMiddleware);

app.listen(Port, () => console.log(`App is listening on ${Port}...`));
