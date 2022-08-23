using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Rooms
    {

        public int roomNumber { set; get; }
        public string roomType { set; get; }
        public int pricePerNight { set; get; }
        public string details { set; get; }
        public DateTime exitDate { set; get; }


        public override string ToString()
        {
            return $"Room Number:{roomNumber}, Room Type:{roomType}, Price Per Night:{pricePerNight}";
        }

    }
}
