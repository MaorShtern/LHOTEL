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
        public static bool CheckIn(RoomReservation roomReservation)
        {
            try
            {
                string str = $@"exec CheckIn {roomReservation.Id},
                '{roomReservation.Entry_Date.ToString("yyyy - MM - dd")}'";
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
        public static bool CheckOut(RoomReservation roomReservation)
        {
            try
            {
                string str = $@"exec CheckOut {roomReservation.Id},
                '{roomReservation.Bill_Date.ToString("yyyy - MM - dd")}'";
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

        public static bool CheckIn_At_The_Counter(RoomReservation roomReservation)
        {
            try
            {
                string str = $@"exec CheckIn_At_The_Counter {roomReservation.Id},'{roomReservation.Card_Holder_Name}'
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

    }
}
