"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DepartmentController_1 = require("../controllers/DepartmentController");
const departmentRoute = express_1.Router();
departmentRoute.get("/departments", DepartmentController_1.DepartmentController.getDepartments);
departmentRoute.post("/departments", DepartmentController_1.DepartmentController.addDepartments);
departmentRoute.delete("/departments/:id", DepartmentController_1.DepartmentController.deletDepartments);
exports.default = departmentRoute;
