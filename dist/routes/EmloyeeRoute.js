"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EmployeeController_1 = require("../controllers/EmployeeController");
const employeeRoute = express_1.Router();
employeeRoute.get("/employees", EmployeeController_1.EmployeeController.getAllEmployees);
employeeRoute.post("/addEmployees", EmployeeController_1.EmployeeController.addEmployee);
employeeRoute.patch("/employee/:id", EmployeeController_1.EmployeeController.changeEmployeeDepartment);
employeeRoute.delete("/employee/:id", EmployeeController_1.EmployeeController.deleteEmployee);
exports.default = employeeRoute;
