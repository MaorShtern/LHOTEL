using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DAL.Classes;

namespace BLL
{
    public class BLLBill_Details
    {
        public static List<RoomResit> RoomResit(int id)
        {
            return DALBillDetails.RoomResit(id);
        }
        public static bool AddCharge(Charge charge)
        {
            return DALBillDetails.AddCharge(charge);
        }
    }
}
