using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DALBillDetails
    {
        public static bool AddCharge(Charge charge)
        {
            try
            {
                string str = $@"exec AddNewBill_Detail {charge.CustomerID},{charge.RoomNumber},
'{charge.ProductDec}',{charge.Amount},'{charge.PaymentMethod}'";
                str = str.Replace("\r\n", string.Empty);
                int result = SQLConnection.ExeNonQuery(str);
                return result == 1;
                   
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
            finally
            {
                SQLConnection.CloseDB();
            }
        }
    }
}
