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
        public static List<Report> Number_Of_Visitors_Per_Month()
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec Number_Of_Visitors_Per_Month");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                List<Report> report = new List<Report>();
                while (reader.Read())
                {
                    report.Add(new Report()
                    {
                        Year = (string)reader["Year"],
                        Month = (string)reader["Month"],
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

        public static List<ProductReport> Amount_Of_Products_Purchased_In_The_Store()
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec Amount_Of_Products_Purchased_In_The_Store");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                List<ProductReport> report = new List<ProductReport>();
                while (reader.Read())
                {
                    report.Add(new ProductReport()
                    {
                        Code = (int)reader["Code"],
                        Product = (string)reader["Product"],
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

        public static List<Report> Number_of_tasks_per_month()
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec Number_of_tasks_per_month");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                List<Report> report = new List<Report>();
                while (reader.Read())
                {
                    report.Add(new Report()
                    {
                        Year = (string)reader["Year"],
                        Month = (string)reader["Month"],
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

        public static ProductReport ProductPurchaseByName(string name)
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec ProductPurchaseByName '{name}'");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                ProductReport product = null;
                while (reader.Read())
                {
                    product = new ProductReport()
                    {
                        Code = (int)reader["Code"],
                        Product = (string)reader["Product"],
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

        public static List<IncomeVsExpense> Income_And_Expenses()
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec Income_And_Expenses");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                List<IncomeVsExpense> report = new List<IncomeVsExpense>();
                while (reader.Read())
                {
                    report.Add(new IncomeVsExpense()
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
