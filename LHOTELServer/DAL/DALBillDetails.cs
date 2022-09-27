using DAL.Classes;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DALBillDetails
    {


        public static List<RoomResit> GetRoomResit(int id)
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec Room_Resit {id}");
                if (reader == null || !reader.HasRows)
                    return null;

                List<RoomResit> roomResit = new List<RoomResit>();
                while (reader.Read())
                {
                    roomResit.Add( new RoomResit()
                    {
                        BillNumber = (int)reader["Bill_Number"],
                        CustomerID = (int)reader["Customer_ID"],
                        BillDate = (DateTime)reader["Bill_Date"],
                        RoomNumber = (int)reader["Room_Number"],
                        RoomType = (string)reader["Room_Type"],
                        PricePerNight = (decimal)reader["Price_Per_Night"],
                        Amount = (decimal)reader["Amount_Of_People"],
                        Breakfest = (bool)reader["Breakfast"],
                        NumberOfNights = (int)reader["Number_Of_Nights"],
                        PaymentMethod = (string)reader["Payment_Method"],
                        PurchaseDate = (DateTime)reader["Purchase_Date"],
                        ProductCode = (int)reader["Product_Code"],
                    });
                }
                return roomResit;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
            finally
            {
                SQLConnection.CloseDB();
            }
        }


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
