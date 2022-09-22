using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class RoomReservation
    {
        public int CustomerID { set; get; }
        public string CardHolderName { set; get; }
        public string CardDate { set; get; }
        public int ThreeDigit { set; get; }
        public string CreditCardNumber { set; get; }
        public int EmployeeID { set; get; }
        public int CounterSingle { set; get; }
        public int CounterDouble { set; get; }
        public int CounterSuite { set; get; }
        public DateTime EntryDate { set; get; }
        public DateTime ExitDate { set; get; }
        public int AmountOfPeople { set; get; }
        //public DateTime Bill_Date { set; get; }

    }
    public class TakenRoom
    {

        public int Room_Number { set; get; }
        //public int[] Rooms { set; get; }
        public int BillNumber { set; get; }
        public int CustomerID { set; get; }
        public DateTime BillDate { set; get; }
        public DateTime EntryDate { set; get; }
        public DateTime ExitDate { set; get; }

        public int AmountOfPeople { set; get; }



    }
    public class Reservation
    {
        public int BillNumber { set; get; }
        public DateTime BillDate { set; get; }
        public int CustomerID { set; get; }
        public int CustomerType { set; get; }
        public string FirstName { set; get; }
        public string LastName { set; get; }
        public string Mail { set; get; }
        public string PhoneNumber { set; get; }
        public DateTime EntryDate { set; get; }
        public DateTime ExitDate { set; get; }
        public int AmountOfPeople { set; get; }
        public int RoomNumber { set; get; }
        public int PricePerNight { set; get; }
        public string RoomStatus { set; get; }




    }
}
