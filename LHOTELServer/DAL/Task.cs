using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Task
    {
        public int Employee_ID { set; get; }
        public int Task_Number { set; get; }
        public string Task_Name { set; get; }
        public DateTime Start_Date { set; get; }
        public string Start_Time { set; get; }
        public DateTime End_Date { set; get; }
        public string Task_Status { set; get; }
        public string Description { set; get; }


    }
}
