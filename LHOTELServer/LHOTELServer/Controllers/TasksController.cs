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
    [System.Web.Http.RoutePrefix("api/Tasks")]

    public class TasksController : ApiController
    {
        [System.Web.Http.HttpGet]
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(BLLTasks.GetAllTasks());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        public IHttpActionResult Get([FromBody] int id, [FromBody] int taskNum, [FromBody] DateTime date)
        {
            try
            {
                return Ok(BLLTasks.GetTaskById(id,taskNum,date));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [System.Web.Http.HttpPost]
        public IHttpActionResult Post([FromBody] Task task)
        {
            try
            {
                return Ok(BLLTasks.AddNewTask(task));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [System.Web.Http.HttpPut]
        public IHttpActionResult Put([FromBody] Task task)
        {
            try
            {
                return Ok(BLLTasks.AlterTask(task));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [System.Web.Http.HttpDelete]
        public IHttpActionResult Delete([FromBody] int id, [FromBody] int taskNum, [FromBody] DateTime date)
        {
            try
            {
                return Ok(BLLTasks.DeleteTask(id,taskNum,date));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        
    }
}