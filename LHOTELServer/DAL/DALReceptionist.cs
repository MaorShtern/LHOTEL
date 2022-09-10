using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
  public  class DALReceptionist
    {
        public static List<TakenRoomReservation> GetTakenRooms()
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder(@"exec GetTakenRooms");
                if (reader == null || !reader.HasRows)
                    return null;


                List<TakenRoomReservation> takenRoomReservation = new List<TakenRoomReservation>();
                while (reader.Read())
                {

                    takenRoomReservation.Add(new TakenRoomReservation()
                    {

                        Id = (int)reader["Customer_ID"],
                        Room_Number =  (int)reader["Room_Number"],
                        //Card_Holder_Name = (string)reader["Card_Holder_Name"],
                        //Card_Date = (string)reader["Card_Date"],
                        //Three_Digit = (int)reader["Three_Digit"],
                        //Credit_Card_Number = (string)reader["Credit_Card_Number"],
                        //Employee_ID = (int)reader["Employee_ID"],
                        //Counter_Single = (int)reader["Counter_Single"],
                        //Counter_Double = (int)reader["Counter_Double"],
                        //Counter_Suite = (int)reader["Counter_Suite"],
                        Entry_Date = (DateTime)reader["Entry_Date"],
                        ExitDate = (DateTime)reader["Exit_Date"],
                        Amount_Of_People = (int)reader["Amount_Of_People"],
                        Bill_Number = (int)reader["Bill_Number"],
                        //FirstName = (string)reader["FirstName"],
                        //LastName = (string)reader["LastName"],
                        Bill_Date = (DateTime)reader["Bill_Date"]


                    });
                }
                return takenRoomReservation;
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





        //public static List<Customers> GetTakenRooms()
        //{
        //    try
        //    {
        //        SqlDataReader reader = SQLConnection.ExcNQReturnReder(@"exec GetTakenRooms");
        //        if (reader == null || !reader.HasRows)
        //            return null;

        //        List<Customers> customers = new List<Customers>();
        //        while (reader.Read())
        //        {
        //            customers.Add(new Customers()
        //            {
        //                CustomerID = (int)reader["Customer_ID"],
        //                CustomerType = (int)reader["Customer_Type"],
        //                FirstName = (string)reader["First_Name"],   CustomerType = (int)reader["Customer_Type"],
        //                FirstName = (string)reader["First_Name"],
        //                LastName = (string)reader["Last_Name"],
        //                Mail = (string)reader["Mail"],
        //                Password = (string)reader["Password"],
        //                PhoneNumber = (string)reader["Phone_Number"],
        //                CardHolderName = (string)reader["Card_Holder_Name"],
        //                CreditCardDate = (string)reader["Credit_Card_Date"],
        //                ThreeDigit = (int)reader["Three_Digit"],
        //                Credit_Card_Number = (string)reader["Credit_Card_Number"]
        //            });
        //        }
        //        return customers;
        //    }
        //    catch (Exception e)
        //    {
        //        Console.WriteLine(e.Message);
        //        return null;
        //    }
        //    finally
        //    {
        //        SQLConnection.CloseDB();
        //    }
        //}
    }
}
