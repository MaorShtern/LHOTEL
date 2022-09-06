using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Products
    {

        public int Product_Code { set; get; }
        public int Category_Number { set; get; }
        public string Description { set; get; }
        public decimal Price_Per_Unit { set; get; }
        public decimal Discount_Percentage { set; get; }


    }
}
