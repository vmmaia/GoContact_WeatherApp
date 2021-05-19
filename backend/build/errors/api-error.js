"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var custom_error_1 = require("./custom-error");
var APIError = /** @class */ (function (_super) {
    __extends(APIError, _super);
    function APIError() {
        var _this = _super.call(this, 'Something went wrong with the external API') || this;
        _this.statusCode = 500;
        Object.setPrototypeOf(_this, APIError.prototype);
        return _this;
    }
    APIError.prototype.serializeErrors = function () {
        return [{ message: 'Something went wrong with the external API' }];
    };
    return APIError;
}(custom_error_1.CustomError));
exports.default = APIError;
