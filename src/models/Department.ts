import { DataTypes, Model, Sequelize, BuildOptions } from "sequelize";

export interface Department{
    id ?: number,
    DepName : string,

}

export interface DepartmentModel extends Model<Department>, Department {}

export class DepartmentClass extends Model<DepartmentModel> {
  async addDepartment() {}
}

export type DepartmentType = typeof Model & {
  new (values?: object, options?: BuildOptions): DepartmentModel;
};

export function DepartmentInit(sequelize: Sequelize): DepartmentType {
  const Department = <DepartmentType>sequelize.define(
    "Department",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      DepName: {
        type: DataTypes.STRING,
        allowNull: false,
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
      tableName: "Departments",
      charset: "utf8mb4",
    }
  );

  return Department;
}
