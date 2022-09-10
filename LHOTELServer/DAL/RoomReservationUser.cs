using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class RoomReservationUser:Customers
    {
        public int Employee_ID { set; get; }
        public int Counter_Single { set; get; }
        public int Counter_Double { set; get; }
        public int Counter_Suite { set; get; }
        public DateTime Entry_Date { set; get; }
        public DateTime ExitDate { set; get; }
       
        public int Amount_Of_People { set; get; }
    }
}
