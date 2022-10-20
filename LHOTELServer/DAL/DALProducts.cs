using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DALProducts
    {
        public static List<Product> GetAllProducts()
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder(@"exec GetAllProducts");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                List<Product> products = new List<Product>();
                while (reader.Read())
                {
                    products.Add(new Product()
                    {
                        ProductCode = (int)reader["Product_Code"],
                        CategoryNumber = (int)reader["Category_Number"],
                        ProductName = (string)reader["Description"],
                        PricePerUnit = (decimal)reader["Price_Per_Unit"],
                        DiscountPercentage = (decimal)reader["Discount_Percentage"]
                    });
                }
                return products;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public static Product GetProductById(int id)
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec GetProductById {id}");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                Product product = null;
                while (reader.Read())
                {
                    product = new Product()
                    {
                        ProductCode = (int)reader["Product_Code"],
                        CategoryNumber = (int)reader["Category_Number"],
                          ProductName = (string)reader["Description"],
                        PricePerUnit = (decimal)reader["Price_Per_Unit"],
                        DiscountPercentage = (decimal)reader["Discount_Percentage"]
                    };
                }
                return product;
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

    
    }
}
