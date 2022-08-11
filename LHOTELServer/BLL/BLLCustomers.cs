using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace BLL
{
    public class BLLCustomers
    {
        public static List<Customers> GetCustomers()
        {
            return DALCustomers.GetAllCustomers();
        }
        public static Customers GetCustomerById(int id)
        {
            return DALCustomers.GetCustomerById(id);
        }
        public static bool AddNewCustomer(Customers customer)
        {
            return DALCustomers.AddNewCustomer(customer);
        }
        public static bool AlterCustomerById(Customers customer)
        {
            return DALCustomers.AlterCustomerById(customer);
        }
        public static bool DeleteCustomerById(int id)
        {
            return DALCustomers.DeleteCustomerById(id);
        }

    }
}
