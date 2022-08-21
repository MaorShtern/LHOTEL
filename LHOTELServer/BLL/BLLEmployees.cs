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

        public static Employees FindEmployeeById(int id)
        {
            return DALEmployees.GetEmployeesById(id);
        }
        public static bool AlterEmployeeById(Employees employee)
        {
            return DALEmployees.AlterEmployee(employee);
        }

        public static bool DeleteEmployeeById(int id)
        {
            return DALEmployees.DeleteEmployeeById(id);
        }

    }
}
