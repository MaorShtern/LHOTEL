using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Charge
    {
        public int CustomerID { set; get; }
        public int RoomNumber { set; get; }
        public string ProductDec { set; get; }
        public int Amount { set; get; }
        public string PaymentMethod { set; get; }



    }
}
