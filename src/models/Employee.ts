import { DataTypes, Model, Sequelize, BuildOptions } from "sequelize";

export interface Employee{
    id ?: number,
    empName : string,
    Age : number

}

export interface EmployeeModel extends Model<Employee>, Employee {}

export class EmployeeClass extends Model<EmployeeModel> {
  async addEmployee() {}
}

export type EmployeeType = typeof Model & {
  new (values?: object, options?: BuildOptions): EmployeeModel;
};

export function EmployeeInit(sequelize: Sequelize): EmployeeType {
  const Employee = <EmployeeType>sequelize.define(
    "Employee",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      empName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Age :{

        type : DataTypes.INTEGER,
        allowNull : false
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
      tableName: "Employees",
      charset: "utf8mb4",
    }
  );

  return Employee;
}
