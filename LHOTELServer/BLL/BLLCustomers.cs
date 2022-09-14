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
        public static CustomerDetails GetDBCustomerById(int id)
        {
            return DALCustomers.GetDBCustomerById(id);
        }

        public static Customers GetCustomerByMailAndPassword(string mail, string password)
        {
            return DALCustomers.GetCustomerByMailAndPassword(mail, password);
        }
        public static bool AddNewCustomer(Customers customer)
        {
            return DALCustomers.AddNewCustomer(customer);
        }
        public static Customers GetCustomerByIDAndMail(int id, string mail)
        {
            return DALCustomers.GetCustomerByIDAndMail(id , mail);
        }
        public static bool AlterCustomerById(Customers customer)
        {
            return DALCustomers.AlterCustomerById(customer);
        }
        //public static bool DeleteCustomerById(int id)
        //{
        //    return DALCustomers.DeleteCustomerById(id);
        //}

    }
}
