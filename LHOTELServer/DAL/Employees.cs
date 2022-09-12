using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Employees
    {
        public int Employee_ID { set; get; }
        public string Description { set; get; }
        public string Employee_Name { set; get; }
        public string Phone_Number { set; get; }
        public DateTime Birth_Date { set; get; }
        public int Hourly_Wage { set; get; }
        public string Address { set; get; }
        //public int Employee_Code { set; get; }


        //public Employees(int id, string name, string phoneNumber, DateTime birthDate, int worker_Code,
        //    int hourly_Wage , string address, int employee_Code )
        //{
        //    this.id = id;
        //    this.name = name;
        //    this.phoneNumber = phoneNumber;
        //    this.birthDate = birthDate;
        //    this.worker_Code = worker_Code;
        //    this.hourly_Wage = hourly_Wage;
        //    this.address = address;
        //    this.employee_Code = employee_Code;
        //}

        //public Employees(int id, string name, string phoneNumber, DateTime birthDate, int worker_Code,
        //  int hourly_Wage, string address)
        //{
        //    this.id = id;
        //    this.name = name;
        //    this.phoneNumber = phoneNumber;
        //    this.birthDate = birthDate;
        //    this.worker_Code = worker_Code;
        //    this.hourly_Wage = hourly_Wage;
        //    this.address = address;
        //}

    }
}
