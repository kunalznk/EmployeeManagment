// @ts-nocheck


import  { Router } from "express";

import { EmployeeController } from "../controllers/EmployeeController";

const employeeRoute = Router();


employeeRoute.get("/employees" , EmployeeController.getAllEmployees);
employeeRoute.post("/addEmployees" , EmployeeController.addEmployee);
employeeRoute.patch("/employee/:id" , EmployeeController.changeEmployeeDepartment);
employeeRoute.delete("/employee/:id" , EmployeeController.deleteEmployee);






export default employeeRoute;


