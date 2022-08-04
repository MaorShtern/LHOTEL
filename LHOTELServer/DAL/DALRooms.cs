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
        public static List<Rooms> GetAllRooms()
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder(@"exec GetAllRooms");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                List<Rooms> rooms = new List<Rooms>();
                while (reader.Read())
                {
                    rooms.Add(new Rooms(
                        (int)reader["Room_Number"],
                        (string)reader["Room_Type"],
                        (int)reader["Price_Per_Night"]
                        ));
                }
                return rooms;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public static Rooms GetRoomById(int id)
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec GetRoomById {id}");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                Rooms rooms = null;
                while (reader.Read())
                {
                    rooms = new Rooms(
                        (int)reader["Room_Number"],
                        (string)reader["Room_Type"],
                        (int)reader["Price_Per_Night"]
                        );
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

        public static bool AddNewRoom(Rooms room)
        {
            try
            {
                if (GetRoomById(room.roomNumber) == null)
                {
                    string str = $@"exec AddNewRoom '{room.roomType}',{room.pricePerNight}";
                    int rowsAffected = SQLConnection.ExeNonQuery(str);
                    if (rowsAffected == 1)
                        return true;
                }
                return false;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }

        public static bool AlterRoomById(Rooms room)
        {
            try
            {
                Rooms findRoom = GetRoomById(room.roomNumber);
                if (findRoom == null)
                {
                    return false;
                }
                string str = $@"AlterRoomById {room.roomNumber},'{room.roomType}',{room.pricePerNight}";
                str = str.Replace("\r\n", string.Empty);
                int result = SQLConnection.ExeNonQuery(str);
                if (result == 1)
                    return true;
                return false;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return true;
            }
        }

        public static bool DeleteRoomById(int id)
        {
            try
            {
                Rooms findRoom = GetRoomById(id);
                if (findRoom == null)
                {
                    return false;
                }
                string str = $@"exec DeleteRoomById {id}";
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
        }

        public static List<Rooms> GetAvailableRooms()
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec GetAvailableRooms");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                List<Rooms> rooms = new List<Rooms>();
                while (reader.Read())
                {
                    rooms.Add(new Rooms(
                        (int)reader["Room_Number"],
                        (string)reader["Room_Type"],
                        (int)reader["Price_Per_Night"],
                        (DateTime)reader["Exit_Date"]
                        ));
                }
                return rooms;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }
    }
}
