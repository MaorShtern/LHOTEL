using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using DAL;
using BLL;


namespace LHOTELServer.Controllers
{
    [EnableCors("*","*","*")]
    [RoutePrefix("api/Rooms")] 

    public class RoomsController : ApiController
    {
        [HttpGet]


        public IHttpActionResult Get()
        {
            try
            {
                return Ok(BLLRooms.GetRooms());
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
                return Ok(BLLRooms.GetRoomById(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //[System.Web.Http.HttpPost]
        //public IHttpActionResult Post([FromBody] Rooms room)
        //{
        //    try
        //    {
        //        return Ok(BLLRooms.AddNewRoom(room));
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //}

        [HttpPost]
        public IHttpActionResult Post()
        {
            try
            {
                return Ok(BLLRooms.GetAvailableRooms());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        public IHttpActionResult Put([FromBody] Rooms room)
        {
            try
            {
                return Ok(BLLRooms.AlterRoomById(room));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                return Ok(BLLRooms.DeleteRoomById(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet]
        [Route("GetAvailableRooms")]
        public IHttpActionResult GetAvailableRooms()
        {
            try
            {
                return Ok(BLLRooms.GetAvailableRooms());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}