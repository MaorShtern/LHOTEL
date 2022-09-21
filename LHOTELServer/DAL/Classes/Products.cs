using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Products
    {

        public int ProductCode { set; get; }
        public int CategoryNumber { set; get; }
        public string Description { set; get; }
        public decimal PricePerUnit { set; get; }
        public decimal DiscountPercentage { set; get; }


    }
}
