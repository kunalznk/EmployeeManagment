"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeInit = exports.EmployeeClass = void 0;
const sequelize_1 = require("sequelize");
class EmployeeClass extends sequelize_1.Model {
    async addEmployee() { }
}
exports.EmployeeClass = EmployeeClass;
function EmployeeInit(sequelize) {
    const Employee = sequelize.define("Employee", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        empName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        Age: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
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
        tableName: "Employees",
        charset: "utf8mb4",
    });
    return Employee;
}
exports.EmployeeInit = EmployeeInit;
