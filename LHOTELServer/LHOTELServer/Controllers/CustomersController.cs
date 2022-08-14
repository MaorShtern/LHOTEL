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
    [System.Web.Http.RoutePrefix("api/Customers")]
    public class CustomersController : ApiController
    {
        [System.Web.Http.HttpGet]
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(BLLCustomers.GetCustomers());
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }

        //[System.Web.Http.Route("~/GetCustomerByMailAndPassword")]
        public IHttpActionResult Get(string mail, string password)
        {
            try
            {
                return Ok(BLLCustomers.GetCustomerByMailAndPassword(mail, password));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [System.Web.Http.HttpPost]
        public IHttpActionResult Post([FromBody] Customers customer)
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
        public IHttpActionResult Put([FromBody] Customers customer)
        {
            try
            {
                return Ok(BLLCustomers.AlterCustomerById(customer));
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        //[System.Web.Http.HttpDelete]
        //public IHttpActionResult Delete(int id)
        //{
        //    try
        //    {
        //        return Ok(BLLCustomers.DeleteCustomerById(id));
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //}

    }
}