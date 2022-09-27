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
        public static bool ClockIn(int id, string time)
        {
            return DALEmployees.ClockIn(id, time);
        }
        public static bool ClockOut(int id, string time)
        {
            return DALEmployees.ClockOut(id, time);
        }
        public static List<Employee> GetAllEmployees()
        {
            return DALEmployees.GetAllEmployees();
        }

        public static bool AddNewEmployee(Employee newEmployee)
        {
            return DALEmployees.AddNewEmployee(newEmployee);
        }

        public static Employee GetEmployeeById(int id)
        {
            return DALEmployees.GetEmployeeById(id);
        }
        public static Employee GetEmployeeByIdAndPassword(int id, int password)
        {
            return DALEmployees.GetEmployeeByIdAndPassword(id, password);
        }
        public static bool AlterEmployeeById(Employee employee)
        {
            return DALEmployees.AlterEmployeeById(employee);
        }

        public static bool DeleteEmployeeById(int id)
        {
            return DALEmployees.DeleteEmployeeById(id);
        }

    }
}
