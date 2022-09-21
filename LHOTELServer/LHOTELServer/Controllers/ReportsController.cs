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

    [System.Web.Http.RoutePrefix("api/Reports")]

    public class ReportsController : ApiController
    {
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/Number_Of_Visitors_Per_Month")]
        public IHttpActionResult Number_Of_Visitors_Per_Month()
        {
            try
            {
                return Ok(BLLReports.Number_Of_Visitors_Per_Month());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/Amount_Of_Products_Purchased_In_The_Store")]
        public IHttpActionResult Amount_Of_Products_Purchased_In_The_Store()
        {
            try
            {
                return Ok(BLLReports.Amount_Of_Products_Purchased_In_The_Store());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/Number_of_tasks_per_month")]
        public IHttpActionResult Number_of_tasks_per_month()
        {
            try
            {
                return Ok(BLLReports.Number_of_tasks_per_month());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [System.Web.Http.HttpPut]
        [System.Web.Http.Route("~/ProductPurchaseByName")]
        public IHttpActionResult ProductPurchaseByName([FromBody] JObject data)
        {
            try
            {
                string name = data["name"].ToObject<string>();
                return Ok(BLLReports.ProductPurchaseByName(name));
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/Income_And_Expenses")]
        public IHttpActionResult Income_And_Expenses()
        {
            try
            {
                return Ok(BLLReports.Income_And_Expenses());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}