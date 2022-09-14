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
    [System.Web.Http.RoutePrefix("api/Bill_Details")]

    public class Bill_DetailsController : ApiController
    {

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("~/AddCharge")]
        public IHttpActionResult AddCharge([FromBody] AddCharge addCharge)
        {
            try
            {
                return Ok(BLLBill_Details.AddCharge(addCharge));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}