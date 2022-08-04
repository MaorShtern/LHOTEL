using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Products
    {

        public Products(string description, int pricePerUnit, int discountPercentage)
        {
            this.description = description;
            this.pricePerUnit = pricePerUnit;
            this.discountPercentage = discountPercentage;
        }

        public Products(int product_Code, string description, int pricePerUnit, int discountPercentage)
        {
            this.product_Code = product_Code;
            this.description = description;
            this.pricePerUnit = pricePerUnit;
            this.discountPercentage = discountPercentage;
        }

        public int product_Code { set; get; }
        public string description { set; get; }
        public int pricePerUnit { set; get; }
        public int discountPercentage { set; get; }

        public override string ToString()
        {
            return $"Product Code:{product_Code}, Description:{description}, Price Per Unit:{pricePerUnit}, Discount Percentage:{discountPercentage}";

        }

    }
}
