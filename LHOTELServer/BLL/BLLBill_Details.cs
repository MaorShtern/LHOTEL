using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace BLL
{
    public class BLLBill_Details
    {
        public static bool AddCharge(AddCharge addCharge)
        {
            return DALBill_Details.AddCharge(addCharge);
        }
    }
}
