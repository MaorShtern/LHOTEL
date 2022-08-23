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
        //public static List<Customers> GetAllCustomers()
        //{
        //    try
        //    {
        //        SqlDataReader reader = SQLConnection.ExcNQReturnReder(@"GetAllCustomers");
        //        if (reader == null && !reader.HasRows)
        //        {
        //            return null;
        //        }
        //        List<Customers> customers = new List<Customers>();
        //        while (reader.Read())
        //        {
        //            customers.Add(new Customers(
        //                (int)reader["Customer_ID"],
        //                (int)reader["Customer_Type"],
        //                (string)reader["First_Name"],
        //                (string)reader["Last_Name"],
        //                (string)reader["Mail"],
        //                (string)reader["Password"],
        //                (string)reader["Phone_Number"],
        //                (string)reader["Card_Holder_Name"],
        //                (string)reader["Credit_Card_Date"],
        //                (int)reader["Three_Digit"]
        //                ));
        //        }
        //        return customers;
        //    }
        //    catch (Exception e)
        //    {
        //        Console.WriteLine(e.Message);
        //        return null;
        //    }
        //}

        public static Customers GetCustomerById(int id)
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec GetCustomerById {id}");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                Customers customer = null;
                while (reader.Read())
                {
                    customer = new Customers(){
                        customerID = (int)reader["Customer_ID"],
                        customerType = (int)reader["Customer_Type"],
                        firstName = (string)reader["First_Name"],
                        lastName = (string)reader["Last_Name"],
                        mail = (string)reader["Mail"],
                        password = (string)reader["Password"],
                        phoneNumber = (string)reader["Phone_Number"],
                        cardHolderName = (string)reader["Card_Holder_Name"],
                        creditCardDate = (string)reader["Credit_Card_Date"],
                        threeDigit = (int)reader["Three_Digit"],
                        credit_Card_Number = (string)reader["Credit_Card_Number"]
                    };
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
                    customer = new Customers()
                    {
                        customerID = (int)reader["Customer_ID"],
                        customerType = (int)reader["Customer_Type"],
                        firstName = (string)reader["First_Name"],
                        lastName = (string)reader["Last_Name"],
                        mail = (string)reader["Mail"],
                        password = (string)reader["Password"],
                        phoneNumber = (string)reader["Phone_Number"],
                        cardHolderName = (string)reader["Card_Holder_Name"],
                        creditCardDate = (string)reader["Credit_Card_Date"],
                        threeDigit = (int)reader["Three_Digit"],
                        credit_Card_Number = (string)reader["Credit_Card_Number"]
                    };
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
'{customer.phoneNumber}','{customer.cardHolderName}',
'{customer.creditCardDate}',{customer.threeDigit},'{customer.credit_Card_Number}'";
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
            finally
            {
                SQLConnection.CloseDB();
            }
        }

        public static Customers GetCustomerByIDAndMail(int id, string mail)
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec GetCustomerByIDAndMail '{id}','{mail}'");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                Customers customer = null;
                while (reader.Read())
                {
                    customer = new Customers()
                    {
                        customerID = (int)reader["Customer_ID"],
                        customerType = (int)reader["Customer_Type"],
                        firstName = (string)reader["First_Name"],
                        lastName = (string)reader["Last_Name"],
                        mail = (string)reader["Mail"],
                        password = (string)reader["Password"],
                        phoneNumber = (string)reader["Phone_Number"],
                        cardHolderName = (string)reader["Card_Holder_Name"],
                        creditCardDate = (string)reader["Credit_Card_Date"],
                        threeDigit = (int)reader["Three_Digit"],
                        credit_Card_Number = (string)reader["Credit_Card_Number"]
                    };
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

        public static bool AlterCustomerById(Customers customer)
        {
            try
            {
                Customers findCustomer = GetCustomerById(customer.customerID);
                if (findCustomer == null)
                {
                    return false;
                }
                string str = $@"exec AlterCustomerById {customer.customerID},{customer.customerType},
        '{customer.firstName}','{customer.lastName}','{customer.mail}','{customer.password}',
        '{customer.phoneNumber}','{customer.cardHolderName}','{customer.creditCardDate}'
        ,{customer.threeDigit},'{customer.credit_Card_Number}'";
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
            finally
            {
                SQLConnection.CloseDB();
            }
        }
    }
}
