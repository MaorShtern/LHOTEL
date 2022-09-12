﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace BLL
{
    public class BLLEmployees
    {
        public static bool ClockIn(int id)
        {
            return DALEmployees.ClockIn(id);
        }
        public static bool ClockOut(int id)
        {
            return DALEmployees.ClockOut(id);
        }
        public static List<Employees> GetAllEmployees()
        {
            return DALEmployees.GetAllEmployees();
        }

        public static bool AddNewEmployee(Employees newEmployee)
        {
            return DALEmployees.AddNewEmployee(newEmployee);
        }
      
        public static Employees GetEmployeeById(int id)
        {
            return DALEmployees.GetEmployeeById(id);
        }
        public static Employees GetEmployeeByIdAndPassword(int id, int password)
        {
            return DALEmployees.GetEmployeeByIdAndPassword(id, password);
        }
        public static bool AlterEmployeeById(Employees employee)
        {
            return DALEmployees.AlterEmployeeById(employee);
        }

        //public static bool DeleteEmployeeByIdAndCode(int id, int code)
        //{
        //    return DALEmployees.DeleteEmployeeByIdAndCode(id, code);
        //}

    }
}
