using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class SQLConnection
    {
        public static string conStr = @"data source=SQL5108.site4now.net;initial catalog=db_a79b5b_proj13;user id=db_a79b5b_proj13_admin;password=XXNEA6q6VbvATG6g";
        public static SqlConnection sqlConnection = new SqlConnection(conStr);


        public static void CloseDB()
        {
            try
            {
                sqlConnection.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public static void OpenDB()
        {
            try
            {
                sqlConnection.Open();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public static int ExeNonQuery(string str)
        {
            try
            {
                OpenDB();
                SqlCommand comm = new SqlCommand(str, sqlConnection);
                int result = comm.ExecuteNonQuery();
                CloseDB();
                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return 0;
            }
        }

        public static SqlDataReader ExcNQReturnReder(string command)
        {
            try
            {
                SqlCommand comm = new SqlCommand(command, sqlConnection);
                OpenDB();
                SqlDataReader reader = comm.ExecuteReader();
                return reader;
            }
            catch (Exception e)
            {
                sqlConnection.Close();
                Console.WriteLine(e.Message);
                return null;
            }
        }
    }
}
