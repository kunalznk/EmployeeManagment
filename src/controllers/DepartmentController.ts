// @ts-nocheck


import sequelize from "../config/config";
import { Department , EmployeeDepartments } from "../models";


export class DepartmentController{

    static async getDepartments(req : Request, res : Response) : Promise<any> {


        const searchText = req.params.searchText;
        let filterOptions;

        if(searchText) {

             filterOptions = {
                where : {
                    DepName: {
                        [Op.like]: `%${searchText}%`,
                      },
                }
            }

        } else { filterOptions = {}; }

        
       let httpreplyStatus , replyMessage;
        try {

            const departments = await Department.findAll(filterOptions);

            if(departments){
                
            httpreplyStatus = 200;
            replyMessage = {
                status : "Success",
                Department : departments
            }
         } else {

            httpreplyStatus = 200;
            replyMessage = {
                status : "Fail",
            }

         }

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

    static async addDepartments(req : Request, res : Response) : Promise<any> {

        let httpreplyStatus , replyMessage;
         try {

            const DepName : string  = req.query.deptName
 
             const departments = await Department.create({
                 DepName,
             });
 
             if(departments){
                 
             httpreplyStatus = 200;
             replyMessage = {
                 status : "Success",
                 Department : departments
             }
             } else {

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

     static async deletDepartments(req : Request, res : Response) : Promise<any> {

        let httpreplyStatus , replyMessage;
         try {

            const id : number  = +req.params.id;

            await sequelize.transaction(async (t) => {


                await EmployeeDepartments.destroy({
                    where : { departmentId  :id},
                    transaction : t
                })

                const departments = await Department.destroy({
                    where : { id },
                    transaction : t
                });
    
                if(departments){
                    
                httpreplyStatus = 200;
                replyMessage = {
                    status : "Success",
                    Department : departments
                }
                } else {
                    
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