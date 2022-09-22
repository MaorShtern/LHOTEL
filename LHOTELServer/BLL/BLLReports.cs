using DAL;
using DAL.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class BLLReports
    {
        public static List<Number_Of_Visitors_Per_Month> Number_Of_Visitors_Per_Month()
        {
            return DALReports.Number_Of_Visitors_Per_Month();
        }

        public static List<Amount_Of_Products_Purchased_In_The_Store> Amount_Of_Products_Purchased_In_The_Store()
        {
            return DALReports.Amount_Of_Products_Purchased_In_The_Store();
        }

        public static List<Number_of_tasks_per_month> Number_of_tasks_per_month()
        {
            return DALReports.Number_of_tasks_per_month();
        }

        public static ProductPurchase ProductPurchaseByName(string name)
        {
            return DALReports.ProductPurchaseByName(name);

        }

        public static List<Income_And_Expenses> Income_And_Expenses()
        {
            return DALReports.Income_And_Expenses();
        }

    }
}
