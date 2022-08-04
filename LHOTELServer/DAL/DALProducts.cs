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
        public static List<Products> GetAllProducts()
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder(@"exec GetAllProducts");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                List<Products> products = new List<Products>();
                while (reader.Read())
                {
                    products.Add(new Products(
                        (int)reader["Product_Code"],
                        (string)reader["Description"],
                        (int)reader["Price_Per_Unit"],
                        (int)reader["Discount_Percentage"]
                        ));
                }
                return products;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public static Products GetProductById(int id)
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec GetProductById {id}");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                Products product = null;
                while (reader.Read())
                {
                    product = new Products(
                        (int)reader["Product_Code"],
                        (string)reader["Description"],
                        (int)reader["Price_Per_Unit"],
                        (int)reader["Discount_Percentage"]
                        );
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

        public static bool AddNewProduct(Products product)
        {
            try
            {
                if (GetProductById(product.product_Code) == null)
                {
                    string str = $@"exec AddNewProduct '{product.description}',{product.pricePerUnit},{product.discountPercentage}";
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

        public static bool AlterProductById(Products product)
        {
            try
            {
                Products findProduct = GetProductById(product.product_Code);
                if (findProduct == null)
                {
                    return false;
                }
                string str = $@"exec AlterProductById {product.product_Code},'{product.description}',{product.pricePerUnit},{product.discountPercentage}";
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

        public static bool DeleteProductById(int id)
        {
            try
            {
                Products findProduct = GetProductById(id);
                if (findProduct == null)
                {
                    return false;
                }
                string str = $@"exec DeleteProductById {id}";
                int result = SQLConnection.ExeNonQuery(str);
                if (result == 1)
                    return true;
                return false;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }
    }
}
