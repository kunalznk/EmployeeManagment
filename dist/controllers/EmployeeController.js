"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const models_1 = require("../models");
class EmployeeController {
    static async getAllEmployees(req, res) {
        const searchText = req.query.searchText;
        let httpreplyStatus, replyMessage, filterOptions;
        try {
            if (searchText) {
                filterOptions = {
                    where: {
                        empName: {
                            [sequelize_1.Op.like]: `%${searchText}%`,
                        },
                    }
                };
            }
            else {
                filterOptions = {};
            }
            const employee = await models_1.Employee.findAll(filterOptions);
            if (employee) {
                httpreplyStatus = 200;
                replyMessage = {
                    status: "Success",
                    employee
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
                message: "GENERAL SERVER ERROR",
            };
            res.status(httpreplyStatus).json(replyMessage);
        }
    }
    static async addEmployee(req, res) {
        let httpreplyStatus, replyMessage;
        try {
            const empName = req.body.name;
            const Age = +req.body.Age;
            const employee = await models_1.Employee.create({
                empName,
                Age
            });
            if (employee) {
                httpreplyStatus = 200;
                replyMessage = {
                    status: "Success",
                    employee
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
    static async changeEmployeeDepartment(req, res) {
        let httpreplyStatus = 200, replyMessage;
        try {
            const id = +req.params.id;
            const oldId = +req.body.id;
            const departmentId = +req.body.departmentId;
            await config_1.default.transaction(async (t) => {
                let employee;
                if (oldId) {
                    employee = await models_1.EmployeeDepartments.update({ departmentId }, { where: { empId: id, departmentId: oldId }, transaction: t });
                }
                else {
                    employee = await models_1.EmployeeDepartments.create({
                        departmentId,
                        empId: id
                    });
                }
                if (employee) {
                    httpreplyStatus = 200;
                    replyMessage = {
                        status: "Success",
                        Department: employee
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
    static async deleteEmployee(req, res) {
        let httpreplyStatus = 200, replyMessage;
        const id = req.params.id;
        try {
            await config_1.default.transaction(async (t) => {
                const employee = await models_1.EmployeeDepartments.destroy({
                    where: {
                        empId: id
                    }
                });
                await models_1.Employee.destroy({
                    where: { id }
                });
                if (employee) {
                    httpreplyStatus = 200;
                    replyMessage = {
                        status: "Success",
                        employee
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
exports.EmployeeController = EmployeeController;
