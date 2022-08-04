using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Rooms
    {
        public Rooms(string roomType, int pricePerNight)
        {
            this.roomType = roomType;
            this.pricePerNight = pricePerNight;
        }

        public Rooms(int roomNumber,string roomType, int pricePerNight)
        {
            this.roomNumber = roomNumber;
            this.roomType = roomType;
            this.pricePerNight = pricePerNight;
        }

        public Rooms(int roomNumber, string roomType, int pricePerNight, DateTime exitDate)
        {
            this.roomNumber = roomNumber;
            this.roomType = roomType;
            this.pricePerNight = pricePerNight;
            this.exitDate = exitDate;
        }

        public int roomNumber { set; get; }
        public string roomType { set; get; }
        public int pricePerNight { set; get; }

        public DateTime exitDate { set; get; }


        public override string ToString()
        {
            return $"Room Number:{roomNumber}, Room Type:{roomType}, Price Per Night:{pricePerNight}";
        }

    }
}
