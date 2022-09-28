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
        //public static List<Customers> GetCustomers()
        //{
        //    return DALCustomers.GetAllCustomers();
        //}
        public static User GetDBCustomerById(int id)
        {
            return DALCustomers.GetDBCustomerById(id);
        }

        public static Customer GetCustomerByMailAndPassword(int id, string password)
        {
            return DALCustomers.GetCustomerByMailAndPassword(id, password);
        }
        public static bool AddNewCustomer(Customer customer)
        {
            return DALCustomers.AddNewCustomer(customer);
        }
        public static Customer GetCustomerByIDAndMail(int id, string mail)
        {
            return DALCustomers.GetCustomerByIDAndMail(id, mail);
        }
        public static bool AlterCustomerById(Customer customer)
        {
            return DALCustomers.AlterCustomerById(customer);
        }
        //public static bool DeleteCustomerById(int id)
        //{
        //    return DALCustomers.DeleteCustomerById(id);
        //}

    }
}
