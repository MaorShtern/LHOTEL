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
using Newtonsoft.Json.Linq;

namespace LHOTELServer.Controllers
{
    [System.Web.Http.RoutePrefix("api/Manager")]

    public class ManagerController : ApiController
    {

        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/GetAllEmployees")]
        public IHttpActionResult GetAllEmployees()
        {
            try
            {
                return Ok(BLLEmployees.GetAllEmployees());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/GetAllShift")]
        public IHttpActionResult GetAllShift()
        {
            try
            {
                return Ok(DALManager.GetAllShift());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/GetWorkersOnShift")]
        public IHttpActionResult GetWorkersOnShift()
        {
            try
            {
                return Ok(DALManager.GetWorkersOnShift());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


        //  צריך לשנות את זה
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/GetEmployeeById")]
        public IHttpActionResult GetEmployeeById([FromBody] JObject data)
        {
            try
            {
                int id = data["id"].ToObject<int>();
                return Ok(BLLEmployees.GetEmployeeById(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("~/AddNewEmployee")]
        public IHttpActionResult AddNewEmployee([FromBody] Employees employee)
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
        [System.Web.Http.Route("~/AlterEmployeeById")]
        public IHttpActionResult AlterEmployeeById([FromBody] Employees employee)
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

        
        

        //[System.Web.Http.HttpDelete]
        //[System.Web.Http.Route("~/DeleteEmployeeByIdAndCode")]
        //public IHttpActionResult DeleteEmployeeByIdAndCode(int id, int code)
        //{
        //    try
        //    {
        //        return Ok(BLLEmployees.DeleteEmployeeByIdAndCode(id, code));
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //}
    }
}