﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class SQLConnection // מחלקה לטובת התנהלות מסודרת ויעילה מול מסד הנתונים
    {
        public static string conStr = @"data source=SQL5108.site4now.net;initial catalog=db_a79b5b_proj13;user id=db_a79b5b_proj13_admin;password=XXNEA6q6VbvATG6g"; 
        public static SqlConnection sqlConnection = new SqlConnection(conStr); // יצירת אובייקט חיבור למסד הנתונים 


        public static void CloseDB() // פונקציה לסגירת החיבור עם מסד הנתונים 
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

        public static void OpenDB() // פונקציה לפתיחת החיבור עם מסד הנתונים 
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

        public static int ExeNonQuery(string str) //פונקציה להחזרת כמות השורות המושפעות בעקבות הרצה של הפקודה המתקבלת כפרמטר 
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

        public static SqlDataReader ExcNQReturnReder(string command) //פונקציה להחזרת אובייקט המכיל נתונים בעקבות הרצה של הפקודה המתקבלת כפרמטר
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
                throw e;
            }
        }

      
    }
}
