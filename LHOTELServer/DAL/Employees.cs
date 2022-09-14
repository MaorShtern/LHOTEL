using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Employees
    {
        public int EmployeeID { set; get; }
        public string Description { set; get; }
        public string EmployeeName { set; get; }
        public string PhoneNumber { set; get; }
        public DateTime BirthDate { set; get; }
        public int HourlyWage { set; get; }
        public string Address { set; get; }
        public int EmployeeCode { set; get; }


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
