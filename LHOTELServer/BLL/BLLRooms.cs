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
        public static List<Room> GetAvailableRooms()
        {
            return DALRooms.GetAvailableRooms();
        }
        public static bool SaveRoomReservation(NewReservation reservation)
        {
            return DALRooms.SaveRoomReservation(reservation);
        }
        public static List<ExistingReservation> FindCustomerReservations(int id)
        {
            return DALRooms.FindCustomerReservations(id);

        }
        public static bool CheckIn(string id, string exitDate)
        {
            return DALRooms.CheckIn(id, exitDate);
        }
        public static bool CheckOut(string id, string exitDate)
        {
            return DALRooms.CheckOut(id, exitDate);

        }
        public static bool CheckIn_With_Existing_User(NewReservation reservation)
        {
            return DALRooms.CheckIn_With_Existing_User(reservation);

        }
        public static bool CheckIn_Without_Existing_User(NewReservation reservation)
        {
            return DALRooms.CheckIn_Without_Existing_User(reservation);

        }
        public static bool DeleteReservation(int id)
        {
            return DALRooms.DeleteReservation(id);
        }
        public static List<RoomsHistory> GetAllCustomersHistory(int id)
        {
            return DALRooms.GetAllCustomersHistory(id);
        }

    }
}
