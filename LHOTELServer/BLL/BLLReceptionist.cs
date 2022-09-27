using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace BLL
{
    public class BLLReceptionist
    {
        public static List<BookedRoom> GetBookedRooms()
        {
            return DALReceptionist.GetBookedRooms();
        }
        public static List<ExistingReservation> GetReservedRoomsByCustomerId(int id)
        {
            return DALReceptionist.GetReservedRoomsByCustomerId(id);
        }

    }
}
