import sequelize from "../config/config";

import { EmployeeInit } from "./Employee";
import { DepartmentInit } from "./Department";
import { EmployeeDepartmentsInit } from "./EmployeeDepartments";

export const Employee = EmployeeInit(sequelize);
export const Department = DepartmentInit(sequelize);
export const EmployeeDepartments = EmployeeDepartmentsInit(sequelize);


Employee.belongsToMany(Department , {
    otherKey  : "empId",
    foreignKey :"departmentId" ,
    through : "EmployeeDepartments"

})

Department.belongsToMany(Employee , {
    otherKey  : "departmentId",
    foreignKey :"empId" ,
    through : "EmployeeDepartments"

})

//sequelize.sync();