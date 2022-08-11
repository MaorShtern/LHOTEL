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
using BLL;
using DAL;

namespace LHOTELServer.Controllers
{
    [System.Web.Http.RoutePrefix("api/Products")]

    public class ProductsController : ApiController
    {
        [System.Web.Http.HttpGet]
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(BLLProducts.GetProducts());
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }

        public IHttpActionResult Get(int id)
        {
            try
            {
                return Ok(BLLProducts.GetProductById(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [System.Web.Http.HttpPost]
        public IHttpActionResult Post([FromBody] Products product)
        {
            try
            {
                return Ok(BLLProducts.AddNewProduct(product));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [System.Web.Http.HttpPut]
        public IHttpActionResult Put([FromBody] Products product)
        {
            try
            {
                return Ok(BLLProducts.AlterProductById(product));
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [System.Web.Http.HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                return Ok(BLLProducts.DeleteProductById(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}