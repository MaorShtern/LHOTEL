using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Task
    {
        public Task(int id, int number, DateTime startDate, DateTime startTime, DateTime endDate, string taskStatus, string description)
        {
            this.id = id;
            this.number = number;
            this.startDate = startDate;
            this.startTime = startTime;
            this.endDate = endDate;
            this.taskStatus = taskStatus;
            this.description = description;
        }

        public int id { set; get; }
        public int number { set; get; }
        public DateTime startDate { set; get; }
        public DateTime startTime { set; get; }
        public DateTime endDate { set; get; }
        public string taskStatus { set; get; }
        public string description { set; get; }

        public override string ToString()
        {
            return $"ID: {id}, Number: {number}, Start Date: {startDate}, Start Time: {startTime}, End Date: {endDate},Task Status: {taskStatus}, Description:{description} ";
        }
    }
}
