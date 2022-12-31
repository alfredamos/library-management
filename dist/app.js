"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const author_route_1 = __importDefault(require("./routes/author.route"));
const book_route_1 = __importDefault(require("./routes/book.route"));
const department_route_1 = __importDefault(require("./routes/department.route"));
const library_route_1 = __importDefault(require("./routes/library.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const not_found_route_middleware_1 = require("./middleware/not-found-route.middleware");
const error_handler_middleware_1 = require("./middleware/error-handler.middleware");
const app = (0, express_1.default)();
const Port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use("/api/authors", author_route_1.default);
app.use("/api/books", book_route_1.default);
app.use("/api/departments", department_route_1.default);
app.use("/api/libraries", library_route_1.default);
app.use("/api/users", user_route_1.default);
app.all('*', not_found_route_middleware_1.notFoundRouteMiddleware);
app.use(error_handler_middleware_1.errorHandlerMiddleware);
app.listen(Port, () => console.log(`App is listening on ${Port}...`));
