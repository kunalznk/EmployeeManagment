import { DataTypes, Model, Sequelize, BuildOptions } from "sequelize";

export interface EmployeeDepartments{
    empId : number,
    departmentId : number

}

export interface EmployeeDepartmentsModel extends Model<EmployeeDepartments>, EmployeeDepartments {}

export class EmployeeDepartmentsClass extends Model<EmployeeDepartmentsModel> {
  async addEmployeeDepartments() {}
}

export type EmployeeDepartmentsType = typeof Model & {
  new (values?: object, options?: BuildOptions): EmployeeDepartmentsModel;
};

export function EmployeeDepartmentsInit(sequelize: Sequelize): EmployeeDepartmentsType {
  const EmployeeDepartments = <EmployeeDepartmentsType>sequelize.define(
    "EmployeeDepartments",
    {
      empId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Employees",
            key: "id",
          },
       
      },
      departmentId: {
        type: DataTypes.INTEGER,
        references : {
            model : "Departments",
            key : "id"
        }

      },
       createdAt: {
        type: DataTypes.DATE,
      },
      createdBy: {
        type: DataTypes.BIGINT,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "EmployeeDepartments",
      charset: "utf8mb4",
    }
  );

  return EmployeeDepartments;
}
