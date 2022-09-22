using DAL.Classes;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DALReports
    {
        public static List<Number_Of_Visitors_Per_Month> Number_Of_Visitors_Per_Month()
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec Number_Of_Visitors_Per_Month");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                List<Number_Of_Visitors_Per_Month> report = new List<Number_Of_Visitors_Per_Month>();
                while (reader.Read())
                {
                    report.Add(new Number_Of_Visitors_Per_Month()
                    {
                        Date = (string)reader["Date"],
                        Month_Name = (string)reader["Month_Name"],
                        Amount = (int)reader["Amount"]
                    });
                }
                return report;
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                SQLConnection.CloseDB();
            }
        }

        public static List<Amount_Of_Products_Purchased_In_The_Store> Amount_Of_Products_Purchased_In_The_Store()
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec Amount_Of_Products_Purchased_In_The_Store");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                List<Amount_Of_Products_Purchased_In_The_Store> report = new List<Amount_Of_Products_Purchased_In_The_Store>();
                while (reader.Read())
                {
                    report.Add(new Amount_Of_Products_Purchased_In_The_Store()
                    {
                        Product_Code = (int)reader["Product_Code"],
                        Product_Name = (string)reader["Product_Name"],
                        Amount = (int)reader["Amount"],
                        Category = (string)reader["Category"]

                    });
                }
                return report;
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                SQLConnection.CloseDB();
            }
        }

        public static List<Number_of_tasks_per_month> Number_of_tasks_per_month()
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec Number_Of_Visitors_Per_Month");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                List<Number_of_tasks_per_month> report = new List<Number_of_tasks_per_month>();
                while (reader.Read())
                {
                    report.Add(new Number_of_tasks_per_month()
                    {
                        Date = (string)reader["Date"],
                        Month_Name = (string)reader["Month_Name"],
                        Amount = (int)reader["Amount"]
                    });
                }
                return report;
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                SQLConnection.CloseDB();
            }
        }

        public static ProductPurchase ProductPurchaseByName(string name)
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec ProductPurchaseByName '{name}'");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                ProductPurchase product = null;
                while (reader.Read())
                {
                    product = new ProductPurchase()
                    {
                        Product_Code = (int)reader["Product_Code"],
                        Product_Name = (string)reader["Product_Name"],
                        Amount = (int)reader["Amount"],
                        Category = (string)reader["Category"],
                    };
                }
                return product;
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                SQLConnection.CloseDB();
            }
        }

        public static List<Income_And_Expenses> Income_And_Expenses()
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec Income_And_Expenses");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                List<Income_And_Expenses> report = new List<Income_And_Expenses>();
                while (reader.Read())
                {
                    report.Add(new Income_And_Expenses()
                    {
                        Date = (string)reader["Date"],
                        Sum = (double)reader["Expens + / Profit -"],
                    });
                }
                return report;
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                SQLConnection.CloseDB();
            }
        }
    }
}
