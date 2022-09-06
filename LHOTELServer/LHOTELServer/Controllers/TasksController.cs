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
    [System.Web.Http.RoutePrefix("api/Tasks")]

    public class TasksController : ApiController
    {
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/GetAllTaske")]
        public IHttpActionResult GetAllTaske()
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

        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/GetTaskById")]
        public IHttpActionResult GetTaskById([FromBody] JObject data)
        {
            try
            {
                int id = data["id"].ToObject<int>();
                return Ok(BLLTasks.GetTaskById(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/GetTaskByCode")]
        public IHttpActionResult GetTaskByCode([FromBody] JObject data)
        {
            try
            {
                int code = data["code"].ToObject<int>();
                return Ok(BLLTasks.GetTaskByCode(code));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("~/AddNewTask")]
        public IHttpActionResult AddNewTask([FromBody] Task task)
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
        [System.Web.Http.Route("~/AlterTask")]
        public IHttpActionResult AlterTask([FromBody] Task task)
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
        [System.Web.Http.Route("~/DeleteTask")]
        public IHttpActionResult DeleteTask([FromBody] JObject data)
        {
            try
            {
                int code = data["task_code"].ToObject<int>();
                return Ok(BLLTasks.DeleteTask(code));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


    }
}