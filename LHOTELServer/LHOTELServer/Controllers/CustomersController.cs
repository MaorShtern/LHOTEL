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
    [System.Web.Http.RoutePrefix("api/Customers")]
    public class CustomersController : ApiController
    {

        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/GetCustomerByMailAndPassword")]
        public IHttpActionResult GetCustomerByMail([FromBody] JObject data)
        {
            try
            {
                string mail = data["mail"].ToObject<string>();
             
                return Ok(BLLCustomers.GetCustomerByMail(mail));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/GetCustomerByIDAndMail")]
        public IHttpActionResult GetCustomerByIDAndMail([FromBody] JObject data)
        {
            try
            {
                int id = data["customerID"].ToObject<int>();
                string mail = data["mail"].ToObject<string>();
                return Ok(BLLCustomers.GetCustomerByIDAndMail(id, mail));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("~/AddNewCustomer")]
        public IHttpActionResult AddNewCustomer([FromBody] Customers customer)
        {
            try
            {
                return Ok(BLLCustomers.AddNewCustomer(customer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        


        [System.Web.Http.HttpPut]
        [System.Web.Http.Route("~/AlterCustomerById")]
        public IHttpActionResult AlterCustomerById([FromBody] Customers customer)
        {
            try
            {
                return Ok(BLLCustomers.AlterCustomerById(customer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        //  האם אנחנו נירצה שהלקוח יוכל להוסיף חיוב לעצמו 
        //  או שהוא יוסיף את הבקשה לחיוב כמשימה ואז אחד העובדים יחייב אותו
     
    }
}