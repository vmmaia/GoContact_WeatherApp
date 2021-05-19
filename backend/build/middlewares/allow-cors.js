"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var allowCORS = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
};
exports.default = allowCORS;
