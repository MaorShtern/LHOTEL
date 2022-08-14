using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;


namespace DAL
{
    public class DALCustomers
    {
        public static List<Customers> GetAllCustomers()
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder(@"GetAllCustomers");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                List<Customers> customers = new List<Customers>();
                while (reader.Read())
                {
                    customers.Add(new Customers(
                        (int)reader["Customer_ID"],
                        (int)reader["Customer_Type"],
                        (string)reader["First_Name"],
                        (string)reader["Last_Name"],
                        (string)reader["Mail"],
                        (string)reader["Password"],
                        (string)reader["Phone_Number"],
                        (string)reader["Card_Holder_Name"],
                        (string)reader["Credit_Card_Date"],
                        (int)reader["Three_Digit"]
                        ));
                }
                return customers;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public static Customers GetCustomerByMailAndPassword(string mail, string password)
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec GetCustomerByMailAndPassword '{mail}','{password}'");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                Customers customer = null;
                while (reader.Read())
                {
                    customer = new Customers(
                        (int)reader["Customer_ID"],
                        (int)reader["Customer_Type"],
                        (string)reader["First_Name"],
                        (string)reader["Last_Name"],
                        (string)reader["Mail"],
                        (string)reader["Password"],
                        (string)reader["Phone_Number"],
                        (string)reader["Card_Holder_Name"],
                        (string)reader["Credit_Card_Date"],
                        (int)reader["Three_Digit"]
                        );
                }
                return customer;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
            finally
            {
                SQLConnection.CloseDB();
            }
        }

        public static bool AddNewCustomer(Customers customer)
        {
            try
            {
                if (GetCustomerByMailAndPassword(customer.mail , customer.password) == null)
                {
                    string str = $@"exec AddNewCustomer {customer.customerID},{customer.customerType},
'{customer.firstName}','{customer.lastName}','{customer.mail}','{customer.password}',
'{customer.phoneNumber}','{customer.cardHolderName}','{customer.creditCardDate}',{customer.threeDigit}";
                    str = str.Replace("\r\n", string.Empty);
                    int rowsAffected = SQLConnection.ExeNonQuery(str);
                    if (rowsAffected == 1)
                        return true;
                }
                return false;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }

        public static bool AlterCustomerById(Customers customer)
        {
            try
            {
                Customers findCustomer = GetCustomerByMailAndPassword(customer.mail, customer.password);
                if (findCustomer == null)
                {
                    return false;
                }
                string str = $@"exec AlterCustomerById {customer.customerID},{customer.customerType},
'{customer.firstName}','{customer.lastName}','{customer.mail}','{customer.password}',
'{customer.phoneNumber}','{customer.cardHolderName}','{customer.creditCardDate}',{customer.threeDigit}";
                str = str.Replace("\r\n", string.Empty);
                int result = SQLConnection.ExeNonQuery(str);
                if (result == 1)
                    return true;
                return false;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return true;
            }
        }

        //public static bool DeleteCustomerById(int id)
        //{
        //    try
        //    {
        //        Customers findCustomer = GetCustomerByMailAndPassword(customer.mail, customer.password);
        //        if (findCustomer == null)
        //        {
        //            return false;
        //        }
        //        string str = $@"exec DeleteCustomerById {id}";
        //        int result = SQLConnection.ExeNonQuery(str);
        //        if (result == 1)
        //            return true;
        //        return false;
        //    }
        //    catch (Exception e)
        //    {
        //        Console.WriteLine(e.Message);
        //        return false;
        //    }
        //}
    }
}
