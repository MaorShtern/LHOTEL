using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using static BCrypt.Net.BCrypt;


namespace DAL
{
    public class DALCustomers
    {
        public static User GetDBCustomerById(int id)
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec GetDBCustomerById {id}");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                User user = null;
                while (reader.Read())
                {
                    user = new User()
                    {
                        CustomerID = (int)reader["Customer_ID"],
                        CustomerType = (int)reader["Customer_Type"],
                        FirstName = (string)reader["First_Name"],
                        LastName = (string)reader["Last_Name"],
                        Mail = (string)reader["Mail"],

                        PhoneNumber = (string)reader["Phone_Number"],

                    };
                }
                return user;
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
        public static Customer GetCustomerById(int id)
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec GetCustomerById {id}");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                Customer customer = null;
                while (reader.Read())
                {
                    customer = new Customer()
                    {
                        CustomerID = (int)reader["Customer_ID"],
                        CustomerType = (int)reader["Customer_Type"],
                        FirstName = (string)reader["First_Name"],
                        LastName = (string)reader["Last_Name"],
                        Mail = (string)reader["Mail"],
                        Password = (string)reader["Password"],
                        PhoneNumber = (string)reader["Phone_Number"],
                        CardHolderName = (string)reader["Card_Holder_Name"],
                        CreditCardNumber = (string)reader["Credit_Card_Number"],
                        CreditCardDate = (string)reader["Credit_Card_Date"],
                        ThreeDigit = (int)reader["Three_Digit"],
                       
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

        public static Customer GetCustomerByMail(string mail)
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec GetCustomerByMail '{mail}'");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }

                //bool verified = Verify(password, (string)reader["Password"]);

                Customer customer = null;
                while (reader.Read())
                {
                    customer = new Customer()
                    {
                        CustomerID = (int)reader["Customer_ID"],
                        CustomerType = (int)reader["Customer_Type"],
                        FirstName = (string)reader["First_Name"],
                        LastName = (string)reader["Last_Name"],
                        Mail = (string)reader["Mail"],
                        Password = (string)reader["Password"],
                        PhoneNumber = (string)reader["Phone_Number"],
                        CardHolderName = (string)reader["Card_Holder_Name"],
                        CreditCardNumber = (string)reader["Credit_Card_Number"],
                        CreditCardDate = (string)reader["Credit_Card_Date"],
                        ThreeDigit = (int)reader["Three_Digit"],
                       
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

        public static Customer GetCustomerByMailAndPassword(string mail, string password)
        {
            try
            {
                Customer customer = GetCustomerByMail(mail);
                bool verify = Verify(password, customer.Password);
                return customer != null && verify ? customer : null;

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


        public static bool AddNewCustomer(Customer customer)
        {
            try
            {
                if (GetCustomerByMail(customer.Mail) == null)
                {


                    string str = $@"exec AddNewCustomer {customer.CustomerID},
1,'{customer.FirstName}','{customer.LastName}','{customer.Mail}',
'{customer.Password}','{customer.PhoneNumber}','{customer.CardHolderName}',
'{customer.CreditCardDate}',{customer.ThreeDigit},'{customer.CreditCardNumber}'";
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

        public static Customer GetCustomerByIDAndMail(int id, string mail)
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec GetCustomerByIDAndMail '{id}','{mail}'");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                Customer customer = null;
                while (reader.Read())
                {
                    customer = new Customer()
                    {
                        CustomerID = (int)reader["Customer_ID"],
                        CustomerType = (int)reader["Customer_Type"],
                        FirstName = (string)reader["First_Name"],
                        LastName = (string)reader["Last_Name"],
                        Mail = (string)reader["Mail"],
                        Password = (string)reader["Password"],
                        PhoneNumber = (string)reader["Phone_Number"],
                        CardHolderName = (string)reader["Card_Holder_Name"],
                        CreditCardDate = (string)reader["Credit_Card_Date"],
                        ThreeDigit = (int)reader["Three_Digit"],
                        CreditCardNumber = (string)reader["Credit_Card_Number"]
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

        public static bool AlterCustomerById(Customer customer)
        {
            try
            {
                Customer findCustomer = GetCustomerById(customer.CustomerID);
                if (findCustomer == null)
                {
                    return false;
                }
                string str = $@"exec AlterCustomerById {customer.CustomerID},{customer.CustomerType},
        '{customer.FirstName}','{customer.LastName}','{customer.Mail}','{customer.Password}',
        '{customer.PhoneNumber}','{customer.CardHolderName}','{customer.CreditCardDate}'
        ,{customer.ThreeDigit},'{customer.CreditCardNumber}'";
                str = str.Replace("\r\n", string.Empty);
                int result = SQLConnection.ExeNonQuery(str);
                return result == 1;
                   
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
