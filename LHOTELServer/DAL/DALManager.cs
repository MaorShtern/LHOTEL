using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DALManager
    {
        public static List<Employees> GetAllEmployees()
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder(@"exec GetAllEmployees");
                if (reader == null || !reader.HasRows)
                    return null;

                List<Employees> employees = new List<Employees>();
                while (reader.Read())
                {
                    employees.Add(new Employees()
                    {
                        Employee_ID = (int)reader["Employee_ID"],
                        Description = (string)reader["Description"],
                        Employee_Name = (string)reader["Employee_Name"],
                        Phone_Number = (string)reader["Phone_Number"],
                        Birth_Date = (DateTime)reader["Birth_Date"],
                        Hourly_Wage = (int)reader["Hourly_Wage"],
                        Address = (string)reader["Address"],
                        Employee_Code = (int)reader["Employee_Code"]
                    });
                }
                return employees;
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

        public static List<Shift> GetAllShift()
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder(@"exec GetAllShifts");
                if (reader == null || !reader.HasRows)
                    return null;

                List<Shift> employees = new List<Shift>();
                while (reader.Read())
                {

                    employees.Add(new Shift()
                    {
                        Employee_ID = (int)reader["Employee_ID"],
                        Employee_Code = (int)reader["Employee_Code"],
                        Employee_Name = (string)reader["Employee_Name"],
                        Description = (string)reader["Description"],
                        Date = (DateTime)reader["Date"],
                        Entrance_Time = (string)reader["Entrance_Time"],
                        Leaving_Time = (reader["Leaving_Time"] != DBNull.Value)
                        ? (string)reader["Leaving_Time"] : null

                });
                }
                return employees;
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


        public static List<Shift> GetWorkersOnShift()
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder(@"exec GetWorkersOnShift");
                if (reader == null || !reader.HasRows)
                    return null;

                List<Shift> employees = new List<Shift>();
                while (reader.Read())
                {

                    employees.Add(new Shift()
                    {
                        Employee_ID = (int)reader["Employee_ID"],
                        Employee_Code = (int)reader["Employee_Code"],
                        Employee_Name = (string)reader["Employee_Name"],
                        Description = (string)reader["Description"],
                        Date = (DateTime)reader["Date"],
                        Entrance_Time = (string)reader["Entrance_Time"],
                        Leaving_Time = null

                    });
                }
                return employees;
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
