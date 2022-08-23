using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace BLL
{
    public class BLLEmployees
    {
        //public static List<Employees> GetEmployees()
        //{
        //    return DALEmployees.GetAllEmployees();
        //}

        public static bool AddNewEmployee(Employees newEmployee)
        {
            return DALEmployees.AddNewEmployee(newEmployee);
        }

        public static Employees GetEmployeeByIdAndCode(int id , int code)
        {
            return DALEmployees.GetEmployeeByIdAndCode(id , code);
        }
        public static bool AlterEmployeeById(Employees employee)
        {
            return DALEmployees.AlterEmployeeById(employee);
        }

        public static bool DeleteEmployeeByIdAndCode(int id, int code)
        {
            return DALEmployees.DeleteEmployeeByIdAndCode(id, code);
        }

    }
}
