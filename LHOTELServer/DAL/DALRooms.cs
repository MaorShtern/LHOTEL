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
        public static List<Rooms> GetAvailableRooms()
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"SELECT * FROM  AvailableRooms() order by Room_Number");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                List<Rooms> rooms = new List<Rooms>();
                while (reader.Read())
                {
                    rooms.Add(new Rooms()
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

        public static bool SaveRoomReservation(RoomReservation roomReservation)
        {
            try
            {
                string str = $@"exec SaveRoomReservation {roomReservation.Id},'{roomReservation.Card_Holder_Name}'
                ,'{roomReservation.Card_Date}',{roomReservation.Three_Digit},'{roomReservation.Credit_Card_Number}'
                ,{roomReservation.Employee_ID},{roomReservation.Counter_Single},{roomReservation.Counter_Double}
                ,{roomReservation.Counter_Suite},'{roomReservation.Entry_Date.ToString("yyyy - MM - dd")}'
                ,'{roomReservation.ExitDate.ToString("yyyy - MM - dd")}',{roomReservation.Amount_Of_People}";
                str = str.Replace("\r\n", string.Empty);
                int result = SQLConnection.ExeNonQuery(str);
                if (result >= 1)
                    return true;
                return false;

            }
            catch (Exception e)
            {
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
                if (result >= 1)
                    return true;
                return false;
            }
            catch (Exception e)
            {
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
                if (result >= 1)
                    return true;
                return false;
            }
            catch (Exception e)
            {
                return false;
            }
            finally
            {
                SQLConnection.CloseDB();
            }
        }

        public static bool CheckIn_With_Existing_User(RoomReservation roomReservation)
        {
            try
            {
                string str = $@"exec CheckIn_With_Existing_User {roomReservation.Id},'{roomReservation.Card_Holder_Name}'
,'{roomReservation.Card_Date}',{roomReservation.Three_Digit},'{roomReservation.Credit_Card_Number}'
,{roomReservation.Employee_ID},{roomReservation.Counter_Single},{roomReservation.Counter_Double},
{roomReservation.Counter_Suite},'{roomReservation.Entry_Date.ToString("yyyy - MM - dd")}'
,'{roomReservation.ExitDate.ToString("yyyy - MM - dd")}',{roomReservation.Amount_Of_People}";
                str = str.Replace("\r\n", string.Empty);
                int result = SQLConnection.ExeNonQuery(str);
                if (result >= 1)
                    return true;
                return false;
            }
            catch (Exception e)
            {
                return false;
            }
            finally
            {
                SQLConnection.CloseDB();
            }
        }


        public static bool CheckIn_Without_Existing_User(RoomReservationUser roomReservationUser)
        {
            try
            {
                string str = $@"exec CheckIn_Without_Existing_User {roomReservationUser.CustomerID},
'{roomReservationUser.FirstName}','{roomReservationUser.LastName}','{roomReservationUser.Mail}',
'{roomReservationUser.PhoneNumber}','{roomReservationUser.CardHolderName}',
'{roomReservationUser.CreditCardDate}',{roomReservationUser.ThreeDigit},
'{roomReservationUser.Credit_Card_Number}',{roomReservationUser.Employee_ID},
{roomReservationUser.Counter_Single},{roomReservationUser.Counter_Double},
{roomReservationUser.Counter_Suite},
'{roomReservationUser.Entry_Date:yyyy-MM-dd}',
'{roomReservationUser.ExitDate:yyyy-MM-dd}',{roomReservationUser.Amount_Of_People}";
                str = str.Replace("\r\n", string.Empty);
                int result = SQLConnection.ExeNonQuery(str);
                if (result >= 1)
                    return true;
                return false;
            }
            catch (Exception e)
            {
                return false;
            }
            finally
            {
                SQLConnection.CloseDB();
            }
        }
    }
}
