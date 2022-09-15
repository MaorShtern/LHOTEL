﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DALBill_Details
    {
        public static bool AddCharge(AddCharge addCharge)
        {
            try
            {
                string str = $@"exec AddNewBill_Detail {addCharge.CustomerID},{addCharge.RoomNumber},
'{addCharge.ProductDec}',{addCharge.Amount},'{addCharge.PaymentMethod}'";
                str = str.Replace("\r\n", string.Empty);
                int result = SQLConnection.ExeNonQuery(str);
                if (result == 1)
                    return true;
                return false;
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