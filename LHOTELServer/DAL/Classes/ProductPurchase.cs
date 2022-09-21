using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Classes
{
    public class ProductPurchase
    {
        public string Product_Code { get; set; }
        public string Product_Name { get; set; }
        public int Amount { get; set; }
        public string Category { get; set; }

    }
}
