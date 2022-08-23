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
        public static List<Rooms> GetAvailableRooms()
        {
            return DALRooms.GetAvailableRooms();
        }
        public static bool SaveRoomReservation(RoomReservation roomReservation)
        {
            return DALRooms.SaveRoomReservation(roomReservation);
        }

        public static bool CheckIn(RoomReservation roomReservation)
        {
            return DALRooms.CheckIn(roomReservation);
        }
        public static bool CheckOut(RoomReservation roomReservation)
        {
            return DALRooms.CheckOut(roomReservation);

        }
    }
}
