"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeDepartmentsInit = exports.EmployeeDepartmentsClass = void 0;
const sequelize_1 = require("sequelize");
class EmployeeDepartmentsClass extends sequelize_1.Model {
    async addEmployeeDepartments() { }
}
exports.EmployeeDepartmentsClass = EmployeeDepartmentsClass;
function EmployeeDepartmentsInit(sequelize) {
    const EmployeeDepartments = sequelize.define("EmployeeDepartments", {
        empId: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: "Employees",
                key: "id",
            },
        },
        departmentId: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: "Departments",
                key: "id"
            }
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
        },
        createdBy: {
            type: sequelize_1.DataTypes.BIGINT,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
        },
    }, {
        tableName: "EmployeeDepartments",
        charset: "utf8mb4",
    });
    return EmployeeDepartments;
}
exports.EmployeeDepartmentsInit = EmployeeDepartmentsInit;
