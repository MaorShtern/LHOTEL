using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;


namespace BLL
{
    public class BLLManager
    {
        public static List<Employees> GetAllEmployees()
        {
            return DALManager.GetAllEmployees();
        }
        public static List<Shift> GetAllEmployeesOnShift()
        {
            return DALManager.GetAllShift();
        }
        public static List<Shift> GetWorkersOnShift()
        {
            return DALManager.GetWorkersOnShift();
        }
    }
}
