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
        [System.Web.Http.HttpPut]
        [System.Web.Http.Route("~/ClockIn")]
        public IHttpActionResult ClockIn(int id)
        {
            try
            {
                return Ok(BLLEmployees.ClockIn(id));
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [System.Web.Http.HttpPut]
        [System.Web.Http.Route("~/ClockOut")]
        public IHttpActionResult ClockOut(int id)
        {
            try
            {
                return Ok(BLLEmployees.ClockOut(id));
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
