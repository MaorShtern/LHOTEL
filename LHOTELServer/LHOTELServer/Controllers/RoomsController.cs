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
    [System.Web.Http.RoutePrefix("api/Rooms")]

    public class RoomsController : ApiController
    {
        
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/GetAvailableRooms")]
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

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("~/SaveRoomReservation")]
        public IHttpActionResult SaveRoomReservation([FromBody] RoomReservation roomReservation)
        {
            try
            {
                return Ok(BLLRooms.SaveRoomReservation(roomReservation));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("~/CheckIn_With_Existing_User")]
        public IHttpActionResult CheckIn_With_Existing_User([FromBody] RoomReservation roomReservation)
        {
            try
            {
                return Ok(BLLRooms.CheckIn_With_Existing_User(roomReservation));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("~/CheckIn_Without_Existing_User")]
        public IHttpActionResult CheckIn_Without_Existing_User([FromBody] RoomReservationUser roomReservationUser)
        {
            try
            {
                return Ok(BLLRooms.CheckIn_Without_Existing_User(roomReservationUser));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [System.Web.Http.HttpPut]
        [System.Web.Http.Route("~/CheckIn")]
        public IHttpActionResult CheckIn([FromBody] JObject data)
        {
            try
            {
                string id = data["mail"].ToObject<string>();
                string entryDate = data["Entry_Date"].ToObject<string>();
                return Ok(BLLRooms.CheckIn(id, entryDate));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
 


        [System.Web.Http.HttpPut]
        [System.Web.Http.Route("~/CheckOut")]
        public IHttpActionResult CheckOut([FromBody] JObject data)
        {
            try
            {
                string id = data["id"].ToObject<string>();
                string exitDate = data["Exit_Date"].ToObject<string>();
                return Ok(BLLRooms.CheckOut(id , exitDate));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }



       
    }
}