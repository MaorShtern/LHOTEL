using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class AddCharge
    {
        public int Id  { set; get; }
        public int Room_Number { set; get; }
        public string Product_Dec { set; get; }
        public int Amount { set; get; }
        public string Payment_Method { set; get; }


   
    }
}
