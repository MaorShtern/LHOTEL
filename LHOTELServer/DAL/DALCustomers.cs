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

        public static Customers GetCustomerByMail(string mail)
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec GetCustomerByMail '{mail}'");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }

                //bool verified = Verify(password, (string)reader["Password"]);

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

        public static Customers GetCustomerByMailAndPassword(string mail, string password)
        {
            try
            {
                Customers customer = GetCustomerByMail(mail);
                return customer;
                bool verify = Verify(password, customer.Password);
                if (customer != null  && verify)
                {
                    return customer;
                }
                else
                    return null;
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
                if (GetCustomerByMail(customer.Mail) == null)
                {


                    string str = $@"exec AddNewCustomer {customer.CustomerID},
1,'{customer.FirstName}','{customer.LastName}','{customer.Mail}',
'{customer.Password}','{customer.PhoneNumber}','{customer.CardHolderName}',
'{customer.CreditCardDate}',{customer.ThreeDigit},'{customer.Credit_Card_Number}'";
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
