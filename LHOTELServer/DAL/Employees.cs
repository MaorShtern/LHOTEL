using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Employees
    {
        public int id { set; get; }
        public string name { set; get; }
        public string phoneNumber { set; get; }
        public DateTime birthDate { set; get; }
        public int worker_Code { set; get; }
        public int hourly_Wage { set; get; }
        public string address { set; get; }

        public Employees(int id, string name, string phoneNumber, DateTime birthDate, int worker_Code, int hourly_Wage, string address)
        {
            this.id = id;
            this.name = name;
            this.phoneNumber = phoneNumber;
            this.birthDate = birthDate;
            this.worker_Code = worker_Code;
            this.hourly_Wage = hourly_Wage;
            this.address = address;
        }

        public override string ToString()
        {
            return $"ID:{id}, Name:{name}, Phone Number:{phoneNumber}, worker Code:{worker_Code}, hourly Wage:{hourly_Wage}, address:{address}";
        }
    }
}
