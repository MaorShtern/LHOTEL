using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Shift
    {
        public int Employee_ID { set; get; }
        public string Employee_Name { set; get; }
        public int Employee_Code { set; get; }
        public string Description { set; get; }
        public DateTime Date { set; get; }
        public string Entrance_Time { set; get; }
        public string Leaving_Time { set; get; }


    }
}
