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
        public static List<int> FindCustomerRoomByID(int id)
        {
            return DALRooms.FindCustomerRoomByID(id);

        }
        //public static bool CheckIn(RoomReservation roomReservation)
        //{
        //    return DALRooms.CheckIn(roomReservation);
        //}
        public static bool CheckIn(string id, string entryDate)
        {
            return DALRooms.CheckIn(id, entryDate);
        }
        //public static bool CheckIn(RoomReservation roomReservation)
        //{
        //    return DALRooms.CheckIn(roomReservation);
        //}
        public static bool CheckOut(string id, string exitDate)
        {
            return DALRooms.CheckOut(id, exitDate);

        }
        public static bool CheckIn_With_Existing_User(RoomReservation roomReservation)
        {
            return DALRooms.CheckIn_With_Existing_User(roomReservation);

        }
        public static bool CheckIn_Without_Existing_User(RoomReservationUser roomReservationUser)
        {
            return DALRooms.CheckIn_Without_Existing_User(roomReservationUser);

        }
    }
}
