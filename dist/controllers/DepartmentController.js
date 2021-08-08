"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentController = void 0;
const config_1 = __importDefault(require("../config/config"));
const models_1 = require("../models");
class DepartmentController {
    static async getDepartments(req, res) {
        const searchText = req.params.searchText;
        let filterOptions;
        if (searchText) {
            filterOptions = {
                where: {
                    DepName: {
                        [Op.like]: `%${searchText}%`,
                    },
                }
            };
        }
        else {
            filterOptions = {};
        }
        let httpreplyStatus, replyMessage;
        try {
            const departments = await models_1.Department.findAll(filterOptions);
            if (departments) {
                httpreplyStatus = 200;
                replyMessage = {
                    status: "Success",
                    Department: departments
                };
            }
            else {
                httpreplyStatus = 200;
                replyMessage = {
                    status: "Fail",
                };
            }
            res.status(httpreplyStatus).json(replyMessage);
        }
        catch (e) {
            httpreplyStatus = 500;
            replyMessage = {
                status: "Fail",
                message: "GENERAL SERVER ERROR"
            };
            res.status(httpreplyStatus).json(replyMessage);
        }
    }
    static async addDepartments(req, res) {
        let httpreplyStatus, replyMessage;
        try {
            const DepName = req.query.deptName;
            const departments = await models_1.Department.create({
                DepName,
            });
            if (departments) {
                httpreplyStatus = 200;
                replyMessage = {
                    status: "Success",
                    Department: departments
                };
            }
            else {
                httpreplyStatus = 200;
                replyMessage = {
                    status: "Fail",
                };
            }
            res.status(httpreplyStatus).json(replyMessage);
        }
        catch (e) {
            console.error(e);
            httpreplyStatus = 500;
            replyMessage = {
                status: "Fail",
                message: "GENERAL SERVER ERROR"
            };
            res.status(httpreplyStatus).json(replyMessage);
        }
    }
    static async deletDepartments(req, res) {
        let httpreplyStatus, replyMessage;
        try {
            const id = +req.params.id;
            await config_1.default.transaction(async (t) => {
                await models_1.EmployeeDepartments.destroy({
                    where: { departmentId: id },
                    transaction: t
                });
                const departments = await models_1.Department.destroy({
                    where: { id },
                    transaction: t
                });
                if (departments) {
                    httpreplyStatus = 200;
                    replyMessage = {
                        status: "Success",
                        Department: departments
                    };
                }
                else {
                    httpreplyStatus = 200;
                    replyMessage = {
                        status: "Fail",
                    };
                }
            });
            res.status(httpreplyStatus).json(replyMessage);
        }
        catch (e) {
            httpreplyStatus = 500;
            replyMessage = {
                status: "Fail",
                message: "GENERAL SERVER ERROR"
            };
            res.status(httpreplyStatus).json(replyMessage);
        }
    }
}
exports.DepartmentController = DepartmentController;
