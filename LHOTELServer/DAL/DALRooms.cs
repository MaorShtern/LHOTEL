using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DALRooms
    {
        public static List<Room> GetAvailableRooms()
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"SELECT * FROM  AvailableRooms() order by Room_Number");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                List<Room> rooms = new List<Room>();
                while (reader.Read())
                {
                    rooms.Add(new Room()
                    {
                        RoomNumber = (int)reader["Room_Number"],
                        RoomType = (string)reader["Room_Type"],
                        PricePerNight = (int)reader["Price_Per_Night"],
                        Details = (string)reader["Details"]
                    });
                }
                return rooms;
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

        public static List<int> FindCustomerRoomByID(int id)
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec FindCustomerRoomByID {id}");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                List<int> rooms = new List<int>();
                while (reader.Read())
                {
                    rooms.Add((int)reader["Room_Number"]);
                }
                return rooms;
            }
            catch (Exception)
            {
                return null;
            }
            finally
            {
                SQLConnection.CloseDB();
            }
        }

        public static bool SaveRoomReservation(NewReservation roomReservation)
        {
            try
            {
                string str = $@"exec SaveRoomReservation {roomReservation.CustomerID},'{roomReservation.CardHolderName}'
                ,'{roomReservation.CreditCardDate}',{roomReservation.ThreeDigit},'{roomReservation.CreditCardNumber}'
                ,{roomReservation.EmployeeID},{roomReservation.CounterSingle},{roomReservation.CounterDouble}
                ,{roomReservation.CounterSuite},'{roomReservation.EntryDate:yyyy - MM - dd}'
                ,'{roomReservation.ExitDate:yyyy - MM - dd}',{roomReservation.AmountOfPeople},{roomReservation.Breakfast}";
                str = str.Replace("\r\n", string.Empty);
                int result = SQLConnection.ExeNonQuery(str);
                return result > 1;

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
        public static bool CheckIn(string id, string entryDate)
        {
            try
            {
                string str = $@"exec CheckIn {id},'{entryDate}'";
                str = str.Replace("\r\n", string.Empty);
                int result = SQLConnection.ExeNonQuery(str);
                return result > 1;

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

        public static bool CheckOut(string id, string exitDate)
        {
            try
            {
                string str = $@"exec CheckOut {id},'{exitDate}'";
                str = str.Replace("\r\n", string.Empty);
                int result = SQLConnection.ExeNonQuery(str);
                return result > 1;

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

        public static bool CheckIn_With_Existing_User(NewReservation reservation)
        {
            try
            {
                string str = $@"exec CheckIn_With_Existing_User {reservation.CustomerID},'{reservation.CardHolderName}'
,'{reservation.CreditCardDate}',{reservation.ThreeDigit},'{reservation.CreditCardNumber}'
,{reservation.EmployeeID},{reservation.CounterSingle},{reservation.CounterDouble},
{reservation.CounterSuite},'{reservation.EntryDate:yyyy - MM - dd}'
,'{reservation.ExitDate:yyyy - MM - dd}',{reservation.AmountOfPeople},{reservation.Breakfast}";
                str = str.Replace("\r\n", string.Empty);
                int result = SQLConnection.ExeNonQuery(str);
                return result > 1;

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


        public static bool CheckIn_Without_Existing_User(NewReservation reservation)
        {
            try
            {
                string str = $@"exec CheckIn_Without_Existing_User {reservation.CustomerID},
'{reservation.FirstName}','{reservation.LastName}','{reservation.Mail}','{reservation.Password}',
'{reservation.PhoneNumber}',
'{reservation.CardHolderName}',
'{reservation.CreditCardDate}',{reservation.ThreeDigit},
'{reservation.CreditCardNumber}',{reservation.EmployeeID},
{reservation.CounterSingle},{reservation.CounterDouble},
{reservation.CounterSuite},
'{reservation.EntryDate:yyyy-MM-dd}',
'{reservation.ExitDate:yyyy-MM-dd}',{reservation.AmountOfPeople},{reservation.Breakfast}";
                str = str.Replace("\r\n", string.Empty);
                int result = SQLConnection.ExeNonQuery(str);
                return result > 1;

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
