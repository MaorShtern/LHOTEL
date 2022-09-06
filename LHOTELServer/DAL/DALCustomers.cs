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
                        Credit_Card_Number = (string)reader["Credit_Card_Number"]
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
                        Credit_Card_Number = (string)reader["Credit_Card_Number"]
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
                if (GetCustomerByMailAndPassword(customer.Mail , customer.Password) == null)
                {


                    string str = $@"exec AddNewCustomer {customer.CustomerID},
{customer.CustomerType},'{customer.FirstName}','{customer.LastName}','{customer.Mail}',
'{HashPassword(customer.Password)}','{customer.PhoneNumber}','{customer.CardHolderName}',
'{customer.CreditCardDate}',{customer.ThreeDigit},'{HashPassword(customer.Credit_Card_Number)}'";
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
                        Credit_Card_Number = (string)reader["Credit_Card_Number"]
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
                Customers findCustomer = GetCustomerById(customer.CustomerID);
                if (findCustomer == null)
                {
                    return false;
                }
                string str = $@"exec AlterCustomerById {customer.CustomerID},{customer.CustomerType},
        '{customer.FirstName}','{customer.LastName}','{customer.Mail}','{customer.Password}',
        '{customer.PhoneNumber}','{customer.CardHolderName}','{customer.CreditCardDate}'
        ,{customer.ThreeDigit},'{customer.Credit_Card_Number}'";
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
