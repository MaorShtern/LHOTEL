using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class RoomReservation
    {
        public int Id { set; get; }
        public string Card_Holder_Name { set; get; }
        public string Card_Date { set; get; }
        public int Three_Digit { set; get; }
        public string Credit_Card_Number { set; get; }
        public int Employee_ID { set; get; }
        public int Counter_Single { set; get; }
        public int Counter_Double { set; get; }
        public int Counter_Suite { set; get; }
        public DateTime Entry_Date { set; get; }
        public DateTime ExitDate { set; get; }
        public int Amount_Of_People { set; get; }
        //public DateTime Bill_Date { set; get; }

    }
}
