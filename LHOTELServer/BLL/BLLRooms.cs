using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace BLL
{
    public class BLLRooms
    {
        public static List<Rooms> GetRooms()
        {
            return DALRooms.GetAllRooms();
        }
        public static Rooms GetRoomById(int id)
        {
            return DALRooms.GetRoomById(id);
        }
        public static bool AddNewRoom(Rooms room)
        {
            return DALRooms.AddNewRoom(room);
        }
        public static bool AlterRoomById(Rooms room)
        {
            return DALRooms.AlterRoomById(room);
        }
        public static bool DeleteRoomById(int id)
        {
            return DALRooms.DeleteRoomById(id);
        }
        public static List<Rooms> GetAvailableRooms()
        {
            return DALRooms.GetAvailableRooms();
        }
    }
}
