using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class RoomReservationUser : Customers
    {
        public int EmployeeID { set; get; }
        public int CounterSingle { set; get; }
        public int CounterDouble { set; get; }
        public int CounterSuite { set; get; }
        public DateTime EntryDate { set; get; }
        public DateTime ExitDate { set; get; }

        public int AmountOfPeople { set; get; }
    }
}
