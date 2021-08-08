// @ts-nocheck

import { Router} from "express";
import { DepartmentController } from "../controllers/DepartmentController";

const departmentRoute = Router();

departmentRoute.get("/departments" , DepartmentController.getDepartments)
departmentRoute.post("/departments" , DepartmentController.addDepartments)
departmentRoute.delete("/departments/:id" , DepartmentController.deletDepartments)






export default departmentRoute;