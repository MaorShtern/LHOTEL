using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Task
    {
        public int Task_Code { set; get; }
        public int Employee_ID { set; get; }
        public string Task_Name { set; get; }
        public int Room_Number { set; get; }

        public DateTime Start_Date { set; get; }
        public string Start_Time { set; get; }
        public string End_Time { set; get; }
        public string Task_Status { set; get; }
        public string Description { set; get; }


    }
}
