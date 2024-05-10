"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const auths_1 = __importDefault(require("./routes/auths"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING).then((_) => {
    console.log("connected to mongodb");
}).catch((error) => {
    console.log(error);
});
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist")));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}));
app.use('/api/auth', auths_1.default);
app.use('/api/users', users_1.default);
app.listen(7001, () => {
    console.log("server running on localhost:7001");
});
