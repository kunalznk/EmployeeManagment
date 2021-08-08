"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentInit = exports.DepartmentClass = void 0;
const sequelize_1 = require("sequelize");
class DepartmentClass extends sequelize_1.Model {
    async addDepartment() { }
}
exports.DepartmentClass = DepartmentClass;
function DepartmentInit(sequelize) {
    const Department = sequelize.define("Department", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        DepName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
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
        tableName: "Departments",
        charset: "utf8mb4",
    });
    return Department;
}
exports.DepartmentInit = DepartmentInit;
