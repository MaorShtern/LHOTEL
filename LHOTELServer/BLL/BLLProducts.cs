using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace BLL
{
    public class BLLProducts
    {
        public static List<Products> GetProducts()
        {
            return DALProducts.GetAllProducts();
        }
        public static Products GetProductById(int id)
        {
            return DALProducts.GetProductById(id);
        }
        public static bool AddNewProduct(Products product)
        {
            return DALProducts.AddNewProduct(product);
        }
        public static bool AlterProductById(Products product)
        {
            return DALProducts.AlterProductById(product);
        }
        public static bool DeleteProductById(int id)
        {
            return DALProducts.DeleteProductById(id);
        }
    }
}
