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
        public IHttpActionResult SaveRoomReservation(RoomReservation roomReservation)
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

        [System.Web.Http.HttpPut]
        [System.Web.Http.Route("~/CheckIn")]
        public IHttpActionResult CheckIn(RoomReservation roomReservation)
        {
            try
            {
                return Ok(BLLRooms.CheckIn(roomReservation));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [System.Web.Http.HttpPut]
        [System.Web.Http.Route("~/CheckOut")]
        public IHttpActionResult CheckOut(RoomReservation roomReservation)
        {
            try
            {
                return Ok(BLLRooms.CheckOut(roomReservation));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [System.Web.Http.HttpPut]
        [System.Web.Http.Route("~/CheckIn_At_The_Counter")]
        public IHttpActionResult CheckIn_At_The_Counter(RoomReservation roomReservation)
        {
            try
            {
                return Ok(BLLRooms.CheckIn_At_The_Counter(roomReservation));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}