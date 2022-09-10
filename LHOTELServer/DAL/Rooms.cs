using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Rooms
    {

        public int RoomNumber { set; get; }
        public string RoomType { set; get; }
        public int PricePerNight { set; get; }
        public string Details { set; get; }
        public DateTime ExitDate { set; get; }


        //public override string ToString()
        //{
        //    return $"Room Number:{roomNumber}, Room Type:{roomType}, Price Per Night:{pricePerNight}";
        //}

    }
   
}
