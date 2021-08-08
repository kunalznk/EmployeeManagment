import { Department } from './../models/Department';
import { Op } from 'sequelize';
// @ts-nocheck

import {Request , Response } from "express";
import sequelize from "../config/config";
import { Employee , EmployeeDepartments} from "../models";


export class EmployeeController{

    static async getAllEmployees(req : Request, res : Response){

        const searchText = req.query.searchText;


        let httpreplyStatus , replyMessage , filterOptions;

         try {

            if(searchText) {
                filterOptions = {
                    where : {
                        empName : {
                            [Op.like]: `%${searchText}%`,
                          },
                    }
                }
            } else { filterOptions = {}}

            const employee = await Employee.findAll(filterOptions);

            if(employee){
                
            httpreplyStatus = 200;
            replyMessage = {
                status : "Success",
                employee
            }} else {

                httpreplyStatus = 200;
                replyMessage = {
                status : "Fail",
            }

            }

            res.status(httpreplyStatus).json(replyMessage);
             
         } catch (e) {

            console.error(e)
            
            httpreplyStatus = 500;
            replyMessage = {
                status : "Fail",
                message : "GENERAL SERVER ERROR",
                
            }
        
            res.status(httpreplyStatus).json(replyMessage);
         }

        



    }

    static async addEmployee(req : Request, res : Response){

        let httpreplyStatus , replyMessage;


         try {


            const empName = req.body.name;
            const Age = +req.body.Age

            const employee = await Employee.create({ 
                empName,
                Age
            });

            if(employee){
                
            httpreplyStatus = 200;
            replyMessage = {
                status : "Success",
                employee
            }} else {

                httpreplyStatus = 200;
            replyMessage = {
                status : "Fail",
            }

            }

            res.status(httpreplyStatus).json(replyMessage);
             
         } catch (e) {


            console.error(e);
            httpreplyStatus = 500;
            replyMessage = {
                status : "Fail",
                message : "GENERAL SERVER ERROR"
            }
        
            res.status(httpreplyStatus).json(replyMessage);
         }

        



    }

    static async changeEmployeeDepartment(req : Request, res : Response){

        let httpreplyStatus = 200 , replyMessage;

         try {

            const id = +req.params.id;
            const oldId = +req.body.id;
            const departmentId = +req.body.departmentId;

            await sequelize.transaction(async (t) => {

                let employee;
                if(oldId)
                {  employee = await EmployeeDepartments.update({ departmentId }, 
                    { where : { empId : id , departmentId : oldId} , transaction : t});
                } else {
                    
                     employee = await EmployeeDepartments.create({
                        departmentId,
                        empId : id
                    })

                }

    
                if(employee){
                    
                httpreplyStatus = 200;
                replyMessage = {
                    status : "Success",
                    Department : employee
                }} else {
                    httpreplyStatus = 200;
                replyMessage = {
                    status : "Fail",
                 }
                }

            })
            

            res.status(httpreplyStatus).json(replyMessage);
             
         } catch (e) {
            
            httpreplyStatus = 500;
            replyMessage = {
                status : "Fail",
                message : "GENERAL SERVER ERROR"
            }
        
            res.status(httpreplyStatus).json(replyMessage);
         }

        



    }

    static async deleteEmployee(req : Request, res : Response){

        let httpreplyStatus = 200 , replyMessage;

        const id = req.params.id;

         try {

            await sequelize.transaction(async (t) => {

                const employee = await EmployeeDepartments.destroy({
                    where : {
                        empId :id
                    }
                 });

                 await Employee.destroy({
                     where : { id}
                 })
    
                if(employee){
                    
                httpreplyStatus = 200;
                replyMessage = {
                    status : "Success",
                    employee
                     
                }} else {

                    httpreplyStatus = 200;
                    replyMessage = {
                        status : "Fail",
                        
                    }

                }

            })

           

            res.status(httpreplyStatus).json(replyMessage);
             
         } catch (e) {
            
            httpreplyStatus = 500;
            replyMessage = {
                status : "Fail",
                message : "GENERAL SERVER ERROR"
            }
        
            res.status(httpreplyStatus).json(replyMessage);
         }

        



    }
    


}