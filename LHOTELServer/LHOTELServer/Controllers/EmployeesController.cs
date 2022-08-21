using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DAL;
using BLL;


namespace LHOTELServer.Controllers
{
    [System.Web.Http.RoutePrefix("api/Employees")]

    public class EmployeesController : ApiController
    {
        //[System.Web.Http.HttpGet]
        //public IHttpActionResult Get()
        //{
        //    try
        //    {
        //        return Ok(BLLEmployees.GetEmployees());
        //    }
        //    catch (Exception)
        //    {
        //        return BadRequest();
        //    }

        //}


        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/GetEmployeeById")]
        public IHttpActionResult GetEmployeeById(int id)
        {
            try
            {
                return Ok(BLLEmployees.FindEmployeeById(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

//  לבדוק למה הסטרינג של הפרוצדורה לא עובד
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("~/AddNewEmployee")]
        public IHttpActionResult AddNewEmployee([FromBody]Employees employee)
        {
            try
            {
                return Ok(BLLEmployees.AddNewEmployee(employee));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [System.Web.Http.HttpPut]
       // [System.Web.Http.Route("/")]
        public IHttpActionResult Put([FromBody] Employees employee)
        {
            try
            {
                return Ok(BLLEmployees.AlterEmployeeById(employee));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [System.Web.Http.HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                return Ok(BLLEmployees.DeleteEmployeeById(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
