"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var custom_error_1 = require("../errors/custom-error");
var logger_1 = __importDefault(require("../utils/logger"));
var errorHandler = function (err, req, res, next) {
    logger_1.default.log('global', err);
    if (err instanceof custom_error_1.CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    res.status(400).send({
        errors: [{ message: 'Something went wrong' }]
    });
};
exports.default = errorHandler;
