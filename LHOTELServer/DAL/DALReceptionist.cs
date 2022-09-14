using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DALReceptionist
    {
        public static List<TakenRoom> GetTakenRooms()
        {
            try
            {

                SqlDataReader reader = SQLConnection.ExcNQReturnReder(@"exec GetTakenRooms");
                if (reader == null || !reader.HasRows)
                    return null;


                List<TakenRoom> takenRooms = new List<TakenRoom>();
                while (reader.Read())
                {

                    takenRooms.Add(new TakenRoom()
                    {
                        CustomerID = (int)reader["Customer_ID"],
                        Room_Number = (int)reader["Room_Number"],
                        Entry_Date = (DateTime)reader["Entry_Date"],
                        ExitDate = (DateTime)reader["Exit_Date"],
                        Amount_Of_People = (int)reader["Amount_Of_People"],
                        Bill_Number = (int)reader["Bill_Number"],
                        Bill_Date = (DateTime)reader["Bill_Date"]


                    });
                }
                return takenRooms;
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

        public static List<Reservation> GetReservedRoomsByCustomerId(int id)
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec GetReservedRoomsByCustomerId {id}");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }

            

                List<Reservation> reservations = new List<Reservation>();
                while (reader.Read())
                {
                    reservations.Add(new Reservation()
                    {
                        Bill_Number = (int)reader["Bill_Number"],
                        Bill_Date = (DateTime)reader["Bill_Date"],
                        Customer_ID = (int)reader["Customer_ID"],
                        Customer_Type = (int)reader["Customers_Type"],
                        First_Name = (string)reader["First_Name"],
                        Last_Name = (string)reader["Last_Name"],
                        Mail = (string)reader["Mail"],
                        Phone_Number = (string)reader["Phone_Number"],
                        Entry_Date = (DateTime)reader["Entry_Date"],
                        Exit_Date = (DateTime)reader["Exit_Date"],
                        Amount_Of_People = (int)reader["Amount_Of_People"],
                        Room_Number = (int)reader["Room_Number"],
                        Price_Per_Night = (int)reader["Price_Per_Night"],
                        Room_Status = (string)reader["Room_Status"],

                    });

                }
                return reservations;
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


        //public static TakenRoom GetReservedRoomsByCustomerId(int id)
        //{
        //    try
        //    {
        //        SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec GetReservedRoomsByCustomerId {id}");
        //        if (reader == null && !reader.HasRows)
        //        {
        //            return null;
        //        }
        //        TakenRoom reserved = null;
        //        while (reader.Read())
        //        {
        //            reserved = new TakenRoom()
        //            {

        //                CustomerID = (int)reader["Customer_ID"],
        //                Room_Number = (int)reader["Room_Number"],
        //                Entry_Date = (DateTime)reader["Entry_Date"],
        //                ExitDate = (DateTime)reader["Exit_Date"],
        //                Amount_Of_People = (int)reader["Amount_Of_People"],
        //                Bill_Number = (int)reader["Bill_Number"],
        //                Bill_Date = (DateTime)reader["Bill_Date"]
        //            };

        //        }
        //        return reserved;
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
