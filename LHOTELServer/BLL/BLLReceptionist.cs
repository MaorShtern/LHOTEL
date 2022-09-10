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
        public static List<TakenRoomReservation> GetTakenRooms()
        {
            return DALReceptionist.GetTakenRooms();
        }

    }
}
