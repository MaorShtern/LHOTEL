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
        public static List<BookedRoom> GetBookedRooms()
        {
            try
            {

                SqlDataReader reader = SQLConnection.ExcNQReturnReder(@"exec GetBookedRooms");
                if (reader == null || !reader.HasRows)
                    return null;


                List<BookedRoom> BookedRooms = new List<BookedRoom>();
                while (reader.Read())
                {
           
                    BookedRooms.Add(new BookedRoom()
                    {

                        RoomNumber = (int)reader["Room_Number"],
                        BillNumber = (int)reader["Bill_Number"],
                        CustomerID = (int)reader["Customer_ID"],
                        BillDate = (DateTime)reader["Bill_Date"],
                        EntryDate = (DateTime)reader["Entry_Date"],
                        ExitDate = (DateTime)reader["Exit_Date"],
                        AmountOfPeople = (int)reader["Amount_Of_People"],
                        Breakfast = (bool)reader["Breakfast"],
                    });
                }
                return BookedRooms;
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

        public static List<ExistingReservation> GetReservedRoomsByCustomerId(int id)
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec GetReservedRoomsByCustomerId {id}");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }



                List<ExistingReservation> CustomerReservations = new List<ExistingReservation>();
                while (reader.Read())
                {
                    CustomerReservations.Add(new ExistingReservation()
                    {
                        BillNumber = (int)reader["Bill_Number"],
                        BillDate = (DateTime)reader["Bill_Date"],
                        CustomerID = (int)reader["Customer_ID"],
                        CustomerType = (int)reader["Customers_Type"],
                        FirstName = (string)reader["First_Name"],
                        LastName = (string)reader["Last_Name"],
                        Mail = (string)reader["Mail"],
                        PhoneNumber = (string)reader["Phone_Number"],
                        EntryDate = (DateTime)reader["Entry_Date"],
                        ExitDate = (DateTime)reader["Exit_Date"],
                        AmountOfPeople = (int)reader["Amount_Of_People"],
                        Breakfast = (bool)reader["Breakfast"],
                        RoomNumber = (int)reader["Room_Number"],
                        PricePerNight = (int)reader["Price_Per_Night"],
                        RoomStatus = (string)reader["Room_Status"],

                    });

                }
                return CustomerReservations;
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


    }
}
